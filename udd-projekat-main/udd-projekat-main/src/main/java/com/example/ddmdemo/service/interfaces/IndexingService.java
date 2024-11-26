package com.example.ddmdemo.service.interfaces;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface IndexingService {
    String indexContractDocument(MultipartFile documentFile);
    String indexLawDocument(MultipartFile documentFile);
}
