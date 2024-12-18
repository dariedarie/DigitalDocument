package com.example.ddmdemo.controller;

import com.example.ddmdemo.dto.SearchQueryDTO;
import com.example.ddmdemo.dto.PhraseSearchQueryDTO;
import com.example.ddmdemo.indexmodel.DocumentIndex;
import com.example.ddmdemo.service.interfaces.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @PostMapping("/simple")
    public Page<DocumentIndex> simpleSearch(@RequestBody SearchQueryDTO simpleSearchQuery,
                                            Pageable pageable) {
        return searchService.simpleSearch(simpleSearchQuery.keywords(), pageable);
    }

    @PostMapping("/advanced")
    public Page<DocumentIndex> advancedSearch(@RequestBody SearchQueryDTO advancedSearchQuery,
                                           Pageable pageable) {
        return searchService.advancedSearch(advancedSearchQuery.keywords(), pageable);
    }

//    @PostMapping("/phrase")
//    public Page<DocumentIndex> phraseSearch(@RequestBody PhraseSearchQueryDTO phraseSearchQuery, Pageable pageable) {
//        return searchService.phraseSearch(phraseSearchQuery.phrase(), pageable);
//    }
}
