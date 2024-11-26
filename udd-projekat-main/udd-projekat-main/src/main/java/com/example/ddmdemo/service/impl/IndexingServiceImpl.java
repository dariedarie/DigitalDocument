package com.example.ddmdemo.service.impl;

import com.example.ddmdemo.exceptionhandling.exception.LoadingException;
import com.example.ddmdemo.exceptionhandling.exception.StorageException;
import com.example.ddmdemo.indexmodel.DocumentIndex;
import com.example.ddmdemo.indexrepository.DocumentIndexRepository;
import com.example.ddmdemo.model.Document;
import com.example.ddmdemo.model.Employee;
import com.example.ddmdemo.model.Government;
import com.example.ddmdemo.model.enums.DocumentType;
import com.example.ddmdemo.respository.DocumentRepository;
import com.example.ddmdemo.respository.EmployeeRepository;
import com.example.ddmdemo.respository.GovernmentRepository;
import com.example.ddmdemo.service.interfaces.FileService;
import com.example.ddmdemo.service.interfaces.IndexingService;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.Objects;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.tika.Tika;
import org.apache.tika.language.detect.LanguageDetector;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class IndexingServiceImpl implements IndexingService {
    private final DocumentIndexRepository documentIndexRepository;

    private final DocumentRepository documentRepository;
    private final GovernmentRepository governmentRepository;
    private final EmployeeRepository employeeRepository;

    private final FileService fileService;

    private final LanguageDetector languageDetector;

    @Override
    @Transactional
    public String indexContractDocument(MultipartFile documentFile) {
        var newDocument = new Document();
        var newDocumentIndex = new DocumentIndex();
        newDocument.setDocumentType(DocumentType.CONTRACT);

        var title = Objects.requireNonNull(documentFile.getOriginalFilename()).split("\\.")[0];
        newDocument.setTitle(title);
        newDocumentIndex.setTitle(title);

        var documentContent = extractDocumentContent(documentFile);

        //newDocument.setContent(documentContent);

        if(detectLanguage(documentContent).equals("SR")) {
            newDocumentIndex.setContentSr(documentContent);
        }else {
            newDocumentIndex.setContentEn(documentContent);
        }

        var serverFilename = fileService.store(documentFile, UUID.randomUUID().toString());
        newDocument.setServerFilename(serverFilename);
        newDocumentIndex.setServerFilename(serverFilename);

        newDocument.setMimeType(detectMimeType(documentFile));

        var employeeName = extractAndSetNames(documentContent, newDocumentIndex);

        Employee employee = employeeRepository.findByFirstNameAndLastName(
            employeeName.getFirstName(),
            employeeName.getLastName()
        );

        // If the employee doesn't exist, create a new one
        if (employee == null) {
            employee = new Employee();
            employee.setFirstName(employeeName.getFirstName());
            employee.setLastName(employeeName.getLastName());
            employee.setDocuments(new HashSet<>()); // Initialize documents set
        } else {
            if (employee.getDocuments() == null) {
                employee.setDocuments(new HashSet<>()); // Initialize documents set if null
            }
        }

        var governmentNameAndLevel = extractAndSetGovernmentInfo(documentContent, newDocumentIndex);

        // Use governmentNameAndLevel.getName() and governmentNameAndLevel.getLevel() to search the database
        Government government = governmentRepository.findByNameAndLevel(
            governmentNameAndLevel.getName(),
            governmentNameAndLevel.getLevel()
        );

        // If the government doesn't exist, create a new one
        if (government == null) {
            government = new Government();
            government.setName(governmentNameAndLevel.getName());
            government.setLevel(governmentNameAndLevel.getLevel());
            government.setDocuments(new HashSet<>()); // Initialize documents set
        } else {
            if (government.getDocuments() == null) {
                government.setDocuments(new HashSet<>()); // Initialize documents set if null
            }
        }

        // Add the document to the government and employee
        employee.getDocuments().add(newDocument);
        government.getDocuments().add(newDocument);

        governmentRepository.save(government);
        employeeRepository.save(employee);
        newDocument.setEmployee(employee);
        newDocument.setGovernment(government);

        var savedDocument = documentRepository.save(newDocument);

        newDocumentIndex.setDatabaseId(savedDocument.getId());

        documentIndexRepository.save(newDocumentIndex);

        return serverFilename;
    }

    @Override
    @Transactional
    public String indexLawDocument(MultipartFile documentFile) {
        var newDocument = new Document();
        var newDocumentIndex = new DocumentIndex();
        newDocument.setDocumentType(DocumentType.LAW);

        var title = Objects.requireNonNull(documentFile.getOriginalFilename()).split("\\.")[0];
        newDocument.setTitle(title);
        newDocumentIndex.setTitle(title);

        var documentContent = extractDocumentContent(documentFile);

        if(detectLanguage(documentContent).equals("SR")) {
            newDocumentIndex.setContentSr(documentContent);
        } else {
            newDocumentIndex.setContentEn(documentContent);
        }

        var serverFilename = fileService.store(documentFile, UUID.randomUUID().toString());
        newDocument.setServerFilename(serverFilename);
        newDocumentIndex.setServerFilename(serverFilename);

        newDocument.setMimeType(detectMimeType(documentFile));

        var savedDocument = documentRepository.save(newDocument);

        newDocumentIndex.setDatabaseId(savedDocument.getId());

        documentIndexRepository.save(newDocumentIndex);

        return serverFilename;
    }

    /**
     * Extracts first and last name based on the phrase "Potpisnik ugovora za klijenta".
     * It gets the two words before the phrase and sets them as firstName and lastName.
     */
    private Employee extractAndSetNames(String documentContent, DocumentIndex newDocumentIndex) {
        String targetPhrase = "Potpisnik ugovora za klijenta";
        int phraseIndex = documentContent.indexOf(targetPhrase);

        if (phraseIndex != -1) {
            // Find the two words before the target phrase
            String contentBeforePhrase = documentContent.substring(0, phraseIndex).trim();
            String[] words = contentBeforePhrase.split("\\s+");

            if (words.length >= 2) {
                String firstName = words[words.length - 2];
                String lastName = words[words.length - 1];

                newDocumentIndex.setFirstName(firstName);
                newDocumentIndex.setLastName(lastName);

                var employee = new Employee();
                employee.setFirstName(firstName);
                employee.setLastName(lastName);
                return employee;
            }
        }

        return null;
    }

    /**
     * Extracts and sets the government name and level of administration based on phrases in the document.
     */
    private Government extractAndSetGovernmentInfo(String documentContent, DocumentIndex newDocumentIndex) {
        String governmentPrefix = "Uprava za";
        String levelPrefix = "Nivo uprave:";

        Government newGovernment = null;

        // Define regex patterns for extracting government name and level
        Pattern governmentPattern = Pattern.compile(governmentPrefix + "\\s*(.+?)\\s*\\n");
        Pattern levelPattern = Pattern.compile(levelPrefix + "\\s*(.+?)\\s*\\n");

        // Find the government name
        Matcher governmentMatcher = governmentPattern.matcher(documentContent);
        if (governmentMatcher.find()) {
            newGovernment = new Government();
            // Extract the government name and include the prefix
            String governmentName = governmentPrefix + " " + governmentMatcher.group(1).trim();
            newGovernment.setName(governmentName);
            newDocumentIndex.setGovernmentName(governmentName);
        }

        // Find the level of administration if government exists
        if (newGovernment != null) {
            Matcher levelMatcher = levelPattern.matcher(documentContent);
            if (levelMatcher.find()) {
                String levelOfAdministration = levelMatcher.group(1).trim();
                newGovernment.setLevel(levelOfAdministration);
                newDocumentIndex.setLevelOfAdministration(levelOfAdministration);
            }
        }

        return newGovernment;
    }



    private String extractDocumentContent(MultipartFile multipartPdfFile) {
        String documentContent;
        try (var pdfFile = multipartPdfFile.getInputStream()) {
            var pdDocument = PDDocument.load(pdfFile);
            var textStripper = new PDFTextStripper();
            documentContent = textStripper.getText(pdDocument);
            pdDocument.close();
        } catch (IOException e) {
            throw new LoadingException("Error while trying to load PDF file content.");
        }

        return documentContent;
    }

    private String detectLanguage(String text) {
        var detectedLanguage = languageDetector.detect(text).getLanguage().toUpperCase();
        if (detectedLanguage.equals("HR")) {
            detectedLanguage = "SR";
        }

        return detectedLanguage;
    }

    private String detectMimeType(MultipartFile file) {
        var contentAnalyzer = new Tika();

        String trueMimeType;
        String specifiedMimeType;
        try {
            trueMimeType = contentAnalyzer.detect(file.getBytes());
            specifiedMimeType =
                Files.probeContentType(Path.of(Objects.requireNonNull(file.getOriginalFilename())));
        } catch (IOException e) {
            throw new StorageException("Failed to detect mime type for file.");
        }

        if (!trueMimeType.equals(specifiedMimeType) &&
            !(trueMimeType.contains("zip") && specifiedMimeType.contains("zip"))) {
            throw new StorageException("True mime type is different from specified one, aborting.");
        }

        return trueMimeType;
    }
}