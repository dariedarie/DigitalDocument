package com.example.ddmdemo.controller;

import com.example.ddmdemo.dto.DocumentFileDTO;
import com.example.ddmdemo.dto.DocumentFileResponseDTO;
import com.example.ddmdemo.service.interfaces.IndexingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/law-document")
@RequiredArgsConstructor
public class LawDocumentController {
    private final IndexingService indexingService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DocumentFileResponseDTO addLawDocumentFile(
            @ModelAttribute DocumentFileDTO documentFile) {
        var serverFilename = indexingService.indexLawDocument(documentFile.file());
        return new DocumentFileResponseDTO(serverFilename);
    }
}
