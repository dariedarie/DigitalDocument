package com.example.ddmdemo.controller;

import com.example.ddmdemo.dto.DocumentFileDTO;
import com.example.ddmdemo.dto.DocumentFileResponseDTO;
import com.example.ddmdemo.service.interfaces.IndexingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/contract-document")
@RequiredArgsConstructor
public class ContractDocumentController {
    private final IndexingService indexingService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DocumentFileResponseDTO addContractDocumentFile(
            @ModelAttribute DocumentFileDTO documentFile) {
        var serverFilename = indexingService.indexContractDocument(documentFile.file());
        return new DocumentFileResponseDTO(serverFilename);
    }
}
