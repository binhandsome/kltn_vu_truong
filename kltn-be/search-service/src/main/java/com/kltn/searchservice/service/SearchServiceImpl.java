package com.kltn.searchservice.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.IndexRequest;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.json.JsonData;
import com.kltn.searchservice.dtos.ProductDocument;
import com.kltn.searchservice.dtos.ProductDto;
import com.kltn.searchservice.dtos.req.ProductFileterAll;
import com.kltn.searchservice.helpers.ProductServiceProxy;
import com.kltn.searchservice.repositories.ProductSearchRepository;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;

import org.springframework.stereotype.Service;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class SearchServiceImpl implements SearchService {
    private final ElasticsearchClient elasticsearchClient;
    private final ProductServiceProxy productServiceProxy;
    private static final String INDEX_NAME = "products";
    private final ProductSearchRepository productSearchRepository;
    private Logger log = LoggerFactory.getLogger(SearchServiceImpl.class);
    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public void syncProducts() throws IOException {
        int page = 0;
        int size = 500; // Số lượng sản phẩm mỗi lần xử lý
        boolean hasMore = true;
        int totalSynced = 0;

        log.info("Starting product synchronization to Elasticsearch");

        while (hasMore) {
            ProductFileterAll filter = new ProductFileterAll();
            filter.setPage(page);
            filter.setSize(size);

            Page<ProductDto> productPage = productServiceProxy.getAllProducts(filter);
            List<ProductDto> products = productPage.getContent();

            if (products.isEmpty()) {
                hasMore = false;
                continue;
            }

            for (ProductDto product : products) {
                try {
                    IndexRequest<ProductDto> request = new IndexRequest.Builder<ProductDto>()
                            .index(INDEX_NAME)
                            .id(product.getProductId().toString())
                            .document(product)
                            .build();
                    elasticsearchClient.index(request);
                    totalSynced++;
                    log.debug("Synced product ID: {}", product.getProductId());
                } catch (IOException e) {
                    log.error("Failed to sync product ID: {}, error: {}", product.getProductId(), e.getMessage());
                    // Có thể bỏ qua hoặc retry tùy ý
                }
            }

            hasMore = productPage.hasNext();
            page++;
            log.info("Completed page {} with {} products, total synced: {}", page, products.size(), totalSynced);
        }

        log.info("Finished syncing {} products", totalSynced);
    }

    @Override
    public void indexProduct(ProductDto productDto) throws IOException {
        IndexRequest<ProductDto> request = IndexRequest.of(i -> i.index(INDEX_NAME)
                .id(productDto.getProductId().toString()).document(productDto));
        elasticsearchClient.index(request);
    }


    public Page<ProductDocument> searchProductByTitle(String keyword, Pageable pageable) {
        // lowercase keyword cho wildcard
        String loweredKeyword = keyword.toLowerCase();

        Query esQuery = Query.of(q -> q.bool(b -> b
                .should(s -> s.match(m -> m
                        .field("productTitle")
                        .query(keyword)
                        .fuzziness("AUTO")
                ))
                .should(s -> s.wildcard(w -> w
                        .field("productTitle.keyword")
                        .value("*" + loweredKeyword + "*")
                ))
                .minimumShouldMatch("1")
        ));

        org.springframework.data.elasticsearch.core.query.Query springQuery = NativeQuery.builder()
                .withQuery(esQuery)
                .withPageable(pageable)
                .build();

        SearchHits<ProductDocument> hits = elasticsearchOperations.search(springQuery, ProductDocument.class);

        List<ProductDocument> results = hits.getSearchHits()
                .stream()
                .map(SearchHit::getContent)
                .toList();

        return new PageImpl<>(results, pageable, hits.getTotalHits());
    }

    public Page<ProductDocument> searchByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
      return productSearchRepository.findByProductPriceBetween(minPrice, maxPrice, pageable);
    }
    public Page<ProductDocument> searchByKeywordAndPrice(
            String keyword,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable
    ) {
        String loweredKeyword = keyword.toLowerCase();

        // Build query
        Query esQuery = Query.of(q -> q.bool(b -> b
                .must(m -> m.bool(inner -> inner
                        .should(s -> s.match(match -> match
                                .field("productTitle")
                                .query(keyword)
                                .fuzziness("AUTO")
                        ))
                        .should(s -> s.wildcard(wc -> wc
                                .field("productTitle.keyword")
                                .value("*" + loweredKeyword + "*")
                        ))
                        .minimumShouldMatch("1")
                ))
                .filter(f -> f.range(r -> r
                        .field("productPrice")
                        .gte(JsonData.of(minPrice))
                        .lte(JsonData.of(maxPrice))
                ))
        ));

        // Build native query
        org.springframework.data.elasticsearch.core.query.Query springQuery = NativeQuery.builder()
                .withQuery(esQuery)
                .withPageable(pageable)
                .build();

        SearchHits<ProductDocument> hits = elasticsearchOperations.search(springQuery, ProductDocument.class);

        List<ProductDocument> results = hits.getSearchHits()
                .stream()
                .map(SearchHit::getContent)
                .toList();

        return new PageImpl<>(results, pageable, hits.getTotalHits());
    }

}