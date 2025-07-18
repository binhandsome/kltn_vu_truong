package com.kltn.searchservice.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.IndexRequest;
import co.elastic.clients.json.JsonData;
import com.kltn.searchservice.dtos.ProductDocument;
import com.kltn.searchservice.dtos.ProductDto;
import com.kltn.searchservice.dtos.req.ProductFileterAll;
import com.kltn.searchservice.dtos.req.RequestRecommend;
import com.kltn.searchservice.helpers.ProductServiceProxy;
import com.kltn.searchservice.helpers.RecommendServiceProxy;
import com.kltn.searchservice.helpers.UserServiceProxy;
import com.kltn.searchservice.repositories.ProductSearchRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;

import org.springframework.stereotype.Service;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
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
    private final UserServiceProxy userServiceProxy;
    private final RecommendServiceProxy recommendServiceProxy;
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
    public Page<ProductDocument> searchAdvanced(
            String keyword,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            List<String> tags,
            Pageable pageable
    ) {

        Query esQuery = Query.of(q -> q.bool(b -> {
            if (keyword != null && !keyword.trim().isEmpty()) {
                String loweredKeyword = keyword.toLowerCase();
                b.must(m -> m.bool(inner -> inner
                        .should(s -> s.match(match -> match
                                .field("productTitle")
                                .query(keyword)
                                .fuzziness("AUTO")
                        ))
                        .should(s -> s.wildcard(wc -> wc
                                .field("productTitle.keyword")
                                .value("*" + loweredKeyword + "*")
                                .caseInsensitive(true) // Ensure case-insensitive wildcard
                        ))
                        .minimumShouldMatch("1")
                ));
            }

            // Price range filter (only add if at least one bound is non-null)
            if (minPrice != null || maxPrice != null) {
                b.filter(f -> f.range(r -> {
                    r.field("productPrice");
                    if (minPrice != null) {
                        r.gte(JsonData.of(minPrice));
                    }
                    if (maxPrice != null) {
                        r.lte(JsonData.of(maxPrice));
                    }
                    return r;
                }));
            }

            // Tags filter
            if (tags != null && !tags.isEmpty()) {
                b.filter(f -> f.terms(t -> t
                        .field("tags.keyword")
                        .terms(ts -> ts.value(tags.stream()
                                .filter(tag -> tag != null) // Avoid null tags
                                .map(FieldValue::of)
                                .toList()))
                ));
            }

            return b;
        }));

        org.springframework.data.elasticsearch.core.query.Query springQuery = NativeQuery.builder()
                .withQuery(esQuery)
                .withPageable(pageable)
                .build();

        try {
            SearchHits<ProductDocument> hits = elasticsearchOperations.search(springQuery, ProductDocument.class);

            List<ProductDocument> results = hits.getSearchHits().stream()
                    .map(SearchHit::getContent)
                    .toList();

            return new PageImpl<>(results, pageable, hits.getTotalHits());
        } catch (Exception e) {
            // Log the error and throw a custom exception or return an empty page
            log.error("Error executing Elasticsearch query: {}", e.getMessage());
            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }
    }

    @Override
    public Page<ProductDocument> searchProductRecommend(RequestRecommend request) {
        Long idUser = userServiceProxy.findUserIdByAccessToken(request.getAccessToken());
        System.out.print("ten cua tao la " + idUser);
        List<String> asinList = recommendServiceProxy.getAllRecommendByUser(idUser);
        System.out.print("list cua tao la " + asinList);

        if (asinList == null || asinList.isEmpty()) {
            return new PageImpl<>(Collections.emptyList(), PageRequest.of(request.getPage(), request.getSize()), 0);
        }
        Query esQuery = Query.of(q -> q.bool(b ->
                b.filter(f -> f.terms(t -> t
                        .field("asin.keyword")
                        .terms(ts -> ts.value(asinList.stream().map(FieldValue::of).toList()))
                ))
        ));

        org.springframework.data.elasticsearch.core.query.Query searchQuery = NativeQuery.builder()
                .withQuery(esQuery)
                .withPageable(PageRequest.of(request.getPage(), request.getSize()))
                .build();
        try {
            SearchHits<ProductDocument> hits = elasticsearchOperations.search(searchQuery, ProductDocument.class);
            List<ProductDocument> result = hits.getSearchHits().stream()
                    .map(SearchHit::getContent)
                    .toList();
            return new PageImpl<>(result, PageRequest.of(request.getPage(), request.getSize()), hits.getTotalHits());
        } catch (Exception e) {
            log.error("Error searching recommend products from ES: {}", e.getMessage());
            return new PageImpl<>(Collections.emptyList(), PageRequest.of(request.getPage(), request.getSize()), 0);
        }
    }

    @Override
    public List<ProductDocument> getRecommendByAsin(String asin) {
        // Gọi proxy để lấy danh sách asin được recommend
        String[] asinRecommend = recommendServiceProxy.findRecommendByAsin(asin);

        if (asinRecommend == null || asinRecommend.length == 0) {
            log.warn("No recommended ASINs found for asin: {}", asin);
            return Collections.emptyList();
        }

        // Làm sạch dữ liệu nếu chuỗi có dấu ngoặc kép hoặc khoảng trắng
        List<String> cleanedAsins = Arrays.stream(asinRecommend)
                .map(s -> s.replace("\"", "").trim())
                .filter(s -> !s.isEmpty())
                .toList();

        if (cleanedAsins.isEmpty()) {
            log.warn("Cleaned ASIN list is empty for asin: {}", asin);
            return Collections.emptyList();
        }

        log.debug("Querying with cleaned ASINs: {}", cleanedAsins);

        // Tạo truy vấn Elasticsearch bằng NativeQuery
        Query esQuery = Query.of(q -> q.bool(b -> {
            b.filter(f -> f.terms(t -> t
                    .field("asin.keyword")
                    .terms(ts -> ts.value(cleanedAsins.stream().map(FieldValue::of).toList()))
            ));
            return b;
        }));

        org.springframework.data.elasticsearch.core.query.Query searchQuery = NativeQuery.builder()
                .withQuery(esQuery)
                .withMaxResults(1000) // Limit results to avoid max_result_window issues
                .build();

        try {
            SearchHits<ProductDocument> hits = elasticsearchOperations.search(searchQuery, ProductDocument.class);
            log.info("Found {} recommended products for asin: {}", hits.getTotalHits(), asin);
            return hits.getSearchHits().stream()
                    .map(SearchHit::getContent)
                    .toList();
        } catch (Exception e) {
            log.error("Error getting recommended products by asin {}: {}", asin, e.getMessage(), e);
            return Collections.emptyList();
        }
    }

}