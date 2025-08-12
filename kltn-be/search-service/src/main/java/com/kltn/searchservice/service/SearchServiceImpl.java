package com.kltn.searchservice.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.*;
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

import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Service;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
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
        Logger logger = LoggerFactory.getLogger(this.getClass());

        // Kiểm tra null
        if (productDto == null || productDto.getProductId() == null || productDto.getAsin() == null) {
            logger.error("ProductDto hoặc các trường bắt buộc null: {}", productDto);
            throw new IllegalArgumentException("ProductDto, productId hoặc asin không được null");
        }

        // Log trước khi lập chỉ mục
        logger.debug("ProductDto: {}", productDto);

        // Tạo và gửi IndexRequest
        IndexRequest<ProductDto> request = IndexRequest.of(i -> i
                .index(INDEX_NAME)
                .id(productDto.getProductId().toString())
                .document(productDto));

        try {
            IndexResponse response = elasticsearchClient.index(request);
            logger.info("Lập chỉ mục thành công - ID: {}, Result: {}, Index: {}",
                    response.id(), response.result(), response.index());

            // Làm mới chỉ mục
            elasticsearchClient.indices().refresh(r -> r.index(INDEX_NAME));
            logger.info("Đã làm mới chỉ mục: {}", INDEX_NAME);
        } catch (IOException e) {
            logger.error("Lỗi lập chỉ mục ProductDto ID: {}, lỗi: {}",
                    productDto.getProductId(), e.getMessage());
            throw e;
        }
    }
    @Override
    public void updateProduct(ProductDto productDto) throws IOException {
        Logger logger = LoggerFactory.getLogger(this.getClass());

        // Kiểm tra null
        if (productDto == null || productDto.getProductId() == null || productDto.getAsin() == null) {
            logger.error("ProductDto hoặc các trường bắt buộc null: {}", productDto);
            throw new IllegalArgumentException("ProductDto, productId hoặc asin không được null");
        }

        // Log trước khi cập nhật
        logger.debug("Cập nhật ProductDto: {}", productDto);

        // Tạo và gửi UpdateRequest
        UpdateRequest<ProductDto, ProductDto> request = UpdateRequest.of(u -> u
                .index(INDEX_NAME)
                .id(productDto.getProductId().toString())
                .doc(productDto)
                .docAsUpsert(true)); // Tạo mới nếu không tồn tại

        try {
            UpdateResponse<ProductDto> response = elasticsearchClient.update(request, ProductDto.class);
            logger.info("Cập nhật thành công - ID: {}, Result: {}, Index: {}",
                    response.id(), response.result(), response.index());

            // Làm mới chỉ mục
            elasticsearchClient.indices().refresh(r -> r.index(INDEX_NAME));
            logger.info("Đã làm mới chỉ mục: {}", INDEX_NAME);
        } catch (IOException e) {
            logger.error("Lỗi cập nhật ProductDto ID: {}, lỗi: {}",
                    productDto.getProductId(), e.getMessage());
            throw e;
        }
    }
    @Override
    public void updateProductThumbnail(Long productId, String productThumbnail) throws IOException {
        Logger logger = LoggerFactory.getLogger(this.getClass());

        // Kiểm tra null
        if (productId == null || productThumbnail == null) {
            logger.error("productId hoặc productThumbnail null: id={}, thumbnail={}", productId, productThumbnail);
            throw new IllegalArgumentException("productId hoặc productThumbnail không được null");
        }

        // Log trước khi cập nhật
        logger.debug("Cập nhật productThumbnail cho ID: {}, thumbnail: {}", productId, productThumbnail);

        // Tạo UpdateRequest với Map để chỉ cập nhật productThumbnail
        UpdateRequest<Map<String, String>, Map<String, String>> request = UpdateRequest.of(u -> u
                .index(INDEX_NAME)
                .id(productId.toString())
                .doc(Map.of("productThumbnail", productThumbnail))
                .docAsUpsert(false)); // Không tạo mới nếu không tồn tại
        try {
            UpdateResponse<Map<String, String>> response = elasticsearchClient.update(request, Map.class);
            logger.info("Cập nhật thành công - ID: {}, Result: {}, Index: {}",
                    response.id(), response.result(), response.index());

            // Làm mới chỉ mục
            elasticsearchClient.indices().refresh(r -> r.index(INDEX_NAME));
            logger.info("Đã làm mới chỉ mục: {}", INDEX_NAME);
        } catch (IOException e) {
            logger.error("Lỗi cập nhật productThumbnail ID: {}, lỗi: {}", productId, e.getMessage());
            throw e;
        }
    }
    @Override
    public ProductDto getProductById(Long productId) {
        try {
            GetRequest getRequest = GetRequest.of(g -> g
                    .index(INDEX_NAME)
                    .id(productId.toString()));

            GetResponse<ProductDto> response = elasticsearchClient.get(getRequest, ProductDto.class);
            if (response.found()) {
                return response.source();
            } else {
                throw new RuntimeException("❌ Không tìm thấy sản phẩm với ID: " + productId);
            }
        } catch (IOException e) {
            throw new RuntimeException("❌ Lỗi khi truy vấn Elasticsearch: " + e.getMessage());
        }
    }
    @Override
    public Page<ProductDocument> searchProductsByStoreIdAndStatus(Long storeId, String status, int page, int size) {
        Criteria criteria = new Criteria("storeId").is(storeId).and("productStatus").is(status);
        CriteriaQuery query = new CriteriaQuery(criteria, PageRequest.of(page, size));

        SearchHits<ProductDocument> searchHits = elasticsearchOperations.search(query, ProductDocument.class);

        List<ProductDocument> products = searchHits.get().map(SearchHit::getContent).toList();
        long totalHits = searchHits.getTotalHits();

        return new PageImpl<>(products, PageRequest.of(page, size), totalHits);
    }

    @Override
    public ProductDto getProductByAsin(String asin) {
        try {
            SearchRequest searchRequest = SearchRequest.of(s -> s
                    .index(INDEX_NAME)
                    .query(q -> q
                            .term(t -> t
                                    .field("asin") // đảm bảo field asin được index dạng keyword
                                    .value(v -> v.stringValue(asin))
                            )
                    )
            );

            SearchResponse<ProductDto> response = elasticsearchClient.search(searchRequest, ProductDto.class);
            if (!response.hits().hits().isEmpty()) {
                return response.hits().hits().get(0).source();
            } else {
                throw new RuntimeException("❌ Không tìm thấy sản phẩm với ASIN: " + asin);
            }
        } catch (IOException e) {
            throw new RuntimeException("❌ Lỗi khi truy vấn Elasticsearch: " + e.getMessage());
        }
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
                                .fuzziness("AUTO")  // để sai chính tả vẫn tìm được
                        ))
                        .should(s -> s.queryString(qs -> qs
                                .defaultField("productTitle")
                                .query("*" + loweredKeyword + "*") // hỗ trợ *keyword*
                        ))
                        .should(s -> s.multiMatch(mm -> mm
                                .fields("productTitle") // nếu có field phụ ngram
                                .query(keyword)
                                .fuzziness("AUTO")
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
        log.info("🔐 Bắt đầu tìm kiếm sản phẩm đề xuất cho accessToken = {}", request.getAccessToken());

        // 1. Lấy ID người dùng từ accessToken
        Long idUser = userServiceProxy.findUserIdByAccessToken(request.getAccessToken());
        log.info("👤 ID người dùng lấy được: {}", idUser);

        // 2. Gọi sang recommend-service để lấy danh sách asin
        List<String> asinList = recommendServiceProxy.getAllRecommendByUser(idUser);
        log.info("📦 Danh sách ASIN ban đầu từ recommend-service: {}", asinList);

        // 3. Làm sạch ASIN (nếu cần)
        List<String> cleanedAsinList = asinList.stream()
                .flatMap(asin -> Arrays.stream(asin.replaceAll("\"", "").split(",")))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
        log.info("✅ Danh sách ASIN sau khi làm sạch: {}", cleanedAsinList);

        // 4. Nếu danh sách trống → trả về rỗng
        if (cleanedAsinList.isEmpty()) {
            log.warn("⚠️ Không có sản phẩm nào để recommend cho userId {}", idUser);
            return new PageImpl<>(Collections.emptyList(), PageRequest.of(request.getPage(), request.getSize()), 0);
        }

        // 5. Tạo Elasticsearch query
        Query esQuery = Query.of(q -> q.bool(b ->
                b.filter(f -> f.terms(t -> t
                        .field("asin")
                        .terms(ts -> ts.value(cleanedAsinList.stream().map(FieldValue::of).toList()))
                ))
        ));
        log.debug("🔍 Elasticsearch query terms: {}", esQuery.toString());

        // 6. Gửi truy vấn
        org.springframework.data.elasticsearch.core.query.Query searchQuery = NativeQuery.builder()
                .withQuery(esQuery)
                .withPageable(PageRequest.of(request.getPage(), request.getSize()))
                .build();

        try {
            SearchHits<ProductDocument> hits = elasticsearchOperations.search(searchQuery, ProductDocument.class);
            List<ProductDocument> result = hits.getSearchHits().stream()
                    .map(SearchHit::getContent)
                    .toList();

            log.info("🎯 Tìm thấy {} sản phẩm từ Elasticsearch cho user {}", result.size(), idUser);

            return new PageImpl<>(result, PageRequest.of(request.getPage(), request.getSize()), hits.getTotalHits());
        } catch (Exception e) {
            log.error("❌ Lỗi khi tìm kiếm sản phẩm recommend từ Elasticsearch: {}", e.getMessage(), e);
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
                    .field("asin")
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
    public Page<ProductDocument> searchAdvancedSeller(
            String keyword,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            List<String> tags,
            Long storeId,
            List<String> status,
            List<Double> percentDiscount,

            Pageable pageable
    ) {
        Query esQuery = Query.of(q -> q.bool(b -> {
            if (keyword != null && !keyword.trim().isEmpty()) {
                String loweredKeyword = keyword.toLowerCase();
                b.must(m -> m.bool(inner -> inner
                        .should(s -> s.match(match -> match
                                .field("productTitle")
                                .query(keyword)
                                .fuzziness("AUTO")  // để sai chính tả vẫn tìm được
                        ))
                        .should(s -> s.queryString(qs -> qs
                                .defaultField("productTitle")
                                .query("*" + loweredKeyword + "*") // hỗ trợ *keyword*
                        ))
                        .should(s -> s.multiMatch(mm -> mm
                                .fields("productTitle") // nếu có field phụ ngram
                                .query(keyword)
                                .fuzziness("AUTO")
                        ))
                        .minimumShouldMatch("1")
                ));
            }


            if (minPrice != null || maxPrice != null) {
                b.filter(f -> f.range(r -> {
                    r.field("productPrice");
                    if (minPrice != null) r.gte(JsonData.of(minPrice));
                    if (maxPrice != null) r.lte(JsonData.of(maxPrice));
                    return r;
                }));
            }

            if (tags != null && !tags.isEmpty()) {
                b.filter(f -> f.terms(t -> t
                        .field("tags.keyword")
                        .terms(ts -> ts.value(
                                tags.stream()
                                        .filter(Objects::nonNull)
                                        .map(FieldValue::of)
                                        .toList()
                        ))
                ));
            }
            if (percentDiscount != null && !percentDiscount.isEmpty()) {
                b.filter(f -> f.bool(bool -> {
                    percentDiscount.stream()
                            .filter(Objects::nonNull)
                            .forEach(val -> {
                                if (val < 0) {
                                    bool.should(s -> s.range(r -> r
                                            .field("percentDiscount")
                                            .lt(JsonData.of(Math.abs(val)))
                                    ));
                                } else {
                                    bool.should(s -> s.range(r -> r
                                            .field("percentDiscount")
                                            .gte(JsonData.of(val))
                                    ));
                                }
                            });

                    return bool.minimumShouldMatch("1");
                }));
            }


            if (storeId != null) {
                b.filter(f -> f.term(t -> t.field("storeId").value(storeId)));
            }

            if (status != null && !status.isEmpty()) {
                b.filter(f -> f.terms(t -> t
                        .field("productStatus.keyword")
                        .terms(ts -> ts.value(status.stream().map(FieldValue::of).toList()))
                ));
            }

            return b;
        }));

        NativeQuery springQuery = NativeQuery.builder()
                .withQuery(esQuery)
                .withPageable(pageable)
                .build();

        try {
            SearchHits<ProductDocument> hits = elasticsearchOperations.search(springQuery, ProductDocument.class);
            List<ProductDocument> results = hits.getSearchHits().stream().map(SearchHit::getContent).toList();
            return new PageImpl<>(results, pageable, hits.getTotalHits());
        } catch (Exception e) {
            log.error("🔥 Elasticsearch query failed: {}", e.getMessage());
            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }
    }
    @Override
    public Map<String, List<ProductDocument>> getRecommendByAsins(List<String> asins) {
        if (asins == null || asins.isEmpty()) {
            log.warn("No ASINs provided for recommendation");
            return Collections.emptyMap();
        }

        // Gọi proxy để lấy recommend cho list ASINs
        Map<String, String[]> asinRecommendMap = recommendServiceProxy.findRecommendByAsins(asins);
        Map<String, List<ProductDocument>> result = new HashMap<>();

        for (String asin : asins) {
            String[] recommendedAsins = asinRecommendMap.getOrDefault(asin, new String[0]);
            if (recommendedAsins.length == 0) {
                log.warn("No recommended ASINs found for asin: {}", asin);
                result.put(asin, Collections.emptyList());
                continue;
            }

            // Làm sạch dữ liệu
            List<String> cleanedAsins = Arrays.stream(recommendedAsins)
                    .map(s -> s.replace("\"", "").trim())
                    .filter(s -> !s.isEmpty())
                    .toList();

            if (cleanedAsins.isEmpty()) {
                log.warn("Cleaned ASIN list is empty for asin: {}", asin);
                result.put(asin, Collections.emptyList());
                continue;
            }

            log.debug("Querying with cleaned ASINs for {}: {}", asin, cleanedAsins);

            // Tạo truy vấn Elasticsearch
            Query esQuery = Query.of(q -> q.bool(b -> {
                b.filter(f -> f.terms(t -> t
                        .field("asin")
                        .terms(ts -> ts.value(cleanedAsins.stream().map(FieldValue::of).toList()))
                ));
                return b;
            }));

            org.springframework.data.elasticsearch.core.query.Query searchQuery = NativeQuery.builder()
                    .withQuery(esQuery)
                    .withMaxResults(1000)
                    .build();

            try {
                SearchHits<ProductDocument> hits = elasticsearchOperations.search(searchQuery, ProductDocument.class);
                log.info("Found {} recommended products for asin: {}", hits.getTotalHits(), asin);
                List<ProductDocument> products = hits.getSearchHits().stream()
                        .map(SearchHit::getContent)
                        .toList();
                result.put(asin, products);
            } catch (Exception e) {
                log.error("Error getting recommended products for asin {}: {}", asin, e.getMessage(), e);
                result.put(asin, Collections.emptyList());
            }
        }

        return result;
    }
}