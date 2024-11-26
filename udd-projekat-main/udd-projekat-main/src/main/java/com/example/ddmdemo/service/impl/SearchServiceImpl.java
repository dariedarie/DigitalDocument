package com.example.ddmdemo.service.impl;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import com.example.ddmdemo.exceptionhandling.exception.MalformedQueryException;
import com.example.ddmdemo.indexmodel.DocumentIndex;
import com.example.ddmdemo.service.interfaces.SearchService;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.common.unit.Fuzziness;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHitSupport;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final ElasticsearchOperations elasticsearchTemplate;

    @Override
    public Page<DocumentIndex> simpleSearch(List<String> keywords, Pageable pageable) {
        var searchQueryBuilder =
            new NativeQueryBuilder().withQuery(buildSimpleSearchQuery(keywords))
                .withPageable(pageable);

        return runQuery(searchQueryBuilder.build());
    }

//    @Override
//    public Page<DocumentIndex> phraseSearch(String phrase, Pageable pageable) {
//        var searchQueryBuilder =
//                new NativeQueryBuilder().withQuery(buildSimpleSearchQuery(phrase))
//                        .withPageable(pageable);
//
//        return runQuery(searchQueryBuilder.build());
//    }


    @Override
    public Page<DocumentIndex> advancedSearch(List<String> expression, Pageable pageable) {
        String operation = expression.get(0);
        expression.remove(0);
        var searchQueryBuilder =
            new NativeQueryBuilder().withQuery(buildAdvancedSearchQuery(expression, operation))
                .withPageable(pageable);

        return runQuery(searchQueryBuilder.build());
    }

    private Query buildSimpleSearchQuery(List<String> tokens) {
        return BoolQuery.of(q -> q.must(mb -> mb.bool(b -> {
            tokens.forEach(token -> {
                // Match Phrase Query - exact phrase search in the required fields
                b.should(sb -> sb.matchPhrase(m -> m.field("first_name").query(token)));
                b.should(sb -> sb.matchPhrase(m -> m.field("last_name").query(token)));
                b.should(sb -> sb.matchPhrase(m -> m.field("government_name").query(token)));
                b.should(sb -> sb.matchPhrase(m -> m.field("level_of_administration").query(token)));
                b.should(sb -> sb.matchPhrase(m -> m.field("title").query(token)));
                b.should(sb -> sb.matchPhrase(m -> m.field("content_sr").query(token)));
                b.should(sb -> sb.matchPhrase(m -> m.field("content_en").query(token)));
            });
            return b;
        })))._toQuery();
    }

//    private Query buildSimpleSearchQuery(String phrase) {
//        return BoolQuery.of(q -> q.must(mb -> mb.bool(b -> {
//            b.should(sb -> sb.matchPhrase(m -> m.field("first_name").query(phrase)));
//            b.should(sb -> sb.matchPhrase(m -> m.field("last_name").query(phrase)));
//            b.should(sb -> sb.matchPhrase(m -> m.field("government_name").query(phrase)));
//            b.should(sb -> sb.matchPhrase(m -> m.field("level_of_administration").query(phrase)));
//            b.should(sb -> sb.matchPhrase(m -> m.field("title").query(phrase)));
//            b.should(sb -> sb.matchPhrase(m -> m.field("content_sr").query(phrase)));
//            b.should(sb -> sb.matchPhrase(m -> m.field("content_en").query(phrase)));
//            return b;
//        })))._toQuery();
//    }

    private Query buildAdvancedSearchQuery(List<String> operands, String operation) {
        // Create a BoolQuery.Builder instance
        BoolQuery.Builder boolQueryBuilder = new BoolQuery.Builder();

        // Create a BoolQuery.Builder for combining all operands
        BoolQuery.Builder globalBoolQueryBuilder = new BoolQuery.Builder();

        // Iterate through operands and apply the specified operation
        for (String operand : operands) {
            String[] parts = operand.split(":");
            if (parts.length != 2) {
                throw new IllegalArgumentException("Operand must be in the format field:value");
            }
            String field = parts[0];
            String value = parts[1];

            // Handle content field separately
            if (field.equals("content")) {
                BoolQuery.Builder contentBoolQueryBuilder = new BoolQuery.Builder();
                contentBoolQueryBuilder.should(sb -> sb.match(mb -> mb.field("content_sr").fuzziness(Fuzziness.ONE.asString()).query(value)));
                contentBoolQueryBuilder.should(sb -> sb.match(mb -> mb.field("content_en").fuzziness(Fuzziness.ONE.asString()).query(value)));
                switch (operation) {
                    case "AND":
                        globalBoolQueryBuilder.must(contentBoolQueryBuilder.build()._toQuery());
                        break;
                    case "OR":
                        globalBoolQueryBuilder.should(contentBoolQueryBuilder.build()._toQuery());
                        break;
                    case "NOT":
                        globalBoolQueryBuilder.mustNot(contentBoolQueryBuilder.build()._toQuery());
                        break;
                    default:
                        throw new IllegalArgumentException("Unsupported operation: " + operation);
                }
            } else {
                switch (operation) {
                    case "AND":
                        boolQueryBuilder.must(m -> m.match(mb -> mb.field(field).fuzziness(Fuzziness.ONE.asString()).query(value)));
                        break;
                    case "OR":
                        boolQueryBuilder.should(m -> m.match(mb -> mb.field(field).fuzziness(Fuzziness.ONE.asString()).query(value)));
                        break;
                    case "NOT":
                        boolQueryBuilder.must(m -> m.match(mb -> mb.field(field).fuzziness(Fuzziness.ONE.asString()).query(value)));
                        boolQueryBuilder.mustNot(m -> m.match(mb -> mb.field(field).query(value)));
                        break;
                    default:
                        throw new IllegalArgumentException("Unsupported operation: " + operation);
                }
            }
        }

        // Apply the global operation to combine all fields
        switch (operation) {
            case "AND":
                globalBoolQueryBuilder.must(boolQueryBuilder.build()._toQuery());
                break;
            case "OR":
                globalBoolQueryBuilder.should(boolQueryBuilder.build()._toQuery());
                break;
            case "NOT":
                globalBoolQueryBuilder.mustNot(boolQueryBuilder.build()._toQuery());
                break;
            default:
                throw new IllegalArgumentException("Unsupported operation: " + operation);
        }

        // Convert the builder to a Query
        return globalBoolQueryBuilder.build()._toQuery();
    }



    private Page<DocumentIndex> runQuery(NativeQuery searchQuery) {

        var searchHits = elasticsearchTemplate.search(searchQuery, DocumentIndex.class,
            IndexCoordinates.of("document_index"));

        var searchHitsPaged = SearchHitSupport.searchPageFor(searchHits, searchQuery.getPageable());

        return (Page<DocumentIndex>) SearchHitSupport.unwrapSearchHits(searchHitsPaged);
    }
}
