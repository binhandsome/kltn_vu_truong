package com.kltn.searchservice.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregate;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.*;
import co.elastic.clients.json.JsonData;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.kltn.searchservice.dtos.*;
import com.kltn.searchservice.dtos.req.ProductFileterAll;
import com.kltn.searchservice.dtos.req.RequestRecommend;
import com.kltn.searchservice.helpers.OrderServiceProxy;
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
import java.util.function.Function;
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
    private final OrderServiceProxy orderServiceProxy;
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
    @Override
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
                        .should(s -> s.queryString(qs -> qs
                                .defaultField("productTitle")
                                .query("*" + loweredKeyword + "*")
                        ))
                        .should(s -> s.multiMatch(mm -> mm
                                .fields("productTitle")
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
                                        .toList()))
                ));
            }
            return b;
        }));

        var springQuery = NativeQuery.builder()
                .withQuery(esQuery)
                .withPageable(pageable)
                .build();

        try {
            SearchHits<ProductDocument> hits =
                    elasticsearchOperations.search(springQuery, ProductDocument.class);

            List<ProductDocument> results = hits.getSearchHits()
                    .stream()
                    .map(SearchHit::getContent)
                    .toList();

            // ----- enrich soldCount (delivered, shipped, packed) -----
            List<Long> ids = results.stream()
                    .map(ProductDocument::getProductId)
                    .filter(Objects::nonNull)
                    .toList();

            Map<Long, Long> soldMap = Collections.emptyMap();
            if (!ids.isEmpty()) {
                try {
                    String csv = ids.stream().map(String::valueOf).collect(Collectors.joining(","));
                    String statusesCsv = "delivered,shipped,packed";

                    // Feign trả Map<String, Long>
                    Map<String, Long> raw = orderServiceProxy.getSoldCounts(csv, null, statusesCsv);

                    Map<Long, Long> converted = new HashMap<>();
                    if (raw != null) {
                        for (Map.Entry<String, Long> e : raw.entrySet()) {
                            try {
                                converted.put(Long.valueOf(e.getKey()), e.getValue() == null ? 0L : e.getValue());
                            } catch (NumberFormatException ignore) {}
                        }
                    }
                    soldMap = converted;
                } catch (Exception ignore) {
                    soldMap = Collections.emptyMap();
                }
            }

            // dùng for-each để không cần biến final trong lambda
            for (ProductDocument doc : results) {
                Long pid = doc.getProductId();
                if (pid != null) {
                    doc.setSoldCount(soldMap.getOrDefault(pid, 0L));
                }
            }
            // ---------------------------------------------------------

            return new PageImpl<>(results, pageable, hits.getTotalHits());
        } catch (Exception e) {
            log.error("Error executing Elasticsearch query", e);
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

    @Override
    public List<ProductDocument> getProductsByAsins(List<String> asins) {
        if (asins == null || asins.isEmpty()) {
            log.warn("No ASINs provided for search");
            return Collections.emptyList();
        }

        // Làm sạch dữ liệu đầu vào
        List<String> cleanedAsins = asins.stream()
                .map(s -> s.replace("\"", "").trim())
                .filter(s -> !s.isEmpty())
                .toList();

        if (cleanedAsins.isEmpty()) {
            log.warn("Cleaned ASIN list is empty");
            return Collections.emptyList();
        }

        log.debug("Querying Elasticsearch for ASINs: {}", cleanedAsins);

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
            log.info("Found {} products for given ASINs", hits.getTotalHits());
            return hits.getSearchHits().stream()
                    .map(SearchHit::getContent)
                    .toList();
        } catch (Exception e) {
            log.error("Error getting products for ASINs: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    // map sort
    private List<SortOptions> sortOf(String sort) {
        return switch (sort == null ? "" : sort) {
            case "new"        -> List.of(SortOptions.of(s -> s.field(f -> f.field("createdAt").order(SortOrder.Desc))));
            case "bestseller" -> List.of(SortOptions.of(s -> s.field(f -> f.field("numberOfRatings").order(SortOrder.Desc))));
            case "priceAsc"   -> List.of(SortOptions.of(s -> s.field(f -> f.field("productPrice").order(SortOrder.Asc))));
            case "priceDesc"  -> List.of(SortOptions.of(s -> s.field(f -> f.field("productPrice").order(SortOrder.Desc))));
            default -> List.of(SortOptions.of(s -> s.score(sc -> sc.order(SortOrder.Desc))));
        };
    }

    @Override
    public EsSearchResult<ProductDocument> searchByStoreWithFacets(
            Long storeId, String q, String sort, String category,
            Double min, Double max, Boolean discountOnly,
            int page, int size) {

        try {
            var b = new co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery.Builder();

            // filter theo store
            b.filter(f -> f.term(t -> t.field("storeId").value(storeId)));

            // keyword
            if (q != null && !q.isBlank()) {
                String lowered = q.toLowerCase();

                b.must(m -> m.bool(inner -> inner
                        // match tiêu chuẩn + fuzziness
                        .should(s -> s.match(mm -> mm
                                .field("productTitle")
                                .query(q)
                                .fuzziness("AUTO")
                        ))
                        // multi-match ĐÚNG dạng danh sách field
                        .should(s -> s.multiMatch(mm -> mm
                                .fields(Arrays.asList("productTitle^3", "brandName", "tags"))
                                .query(q)
                                .fuzziness("AUTO")
                        ))
                        // wildcard trên subfield keyword, không phải query_string
                        .should(s -> s.wildcard(w -> w
                                .field("productTitle.keyword")
                                .value("*" + lowered + "*")
                                .caseInsensitive(true)
                        ))
                        .minimumShouldMatch("1")
                ));
            }


            // category: cho phép nhiều -> match productType / salesRank / tags
            if (category != null && !category.isBlank()) {
                var cats = Arrays.stream(category.split(","))
                        .map(String::trim).filter(s -> !s.isEmpty()).toList();
                if (!cats.isEmpty()) {
                    var values = cats.stream().map(FieldValue::of).toList();
                    b.filter(f -> f.bool(or -> or
                            .should(s -> s.terms(t -> t.field("productType.keyword").terms(ts -> ts.value(values))))
                            .should(s -> s.terms(t -> t.field("salesRank.keyword").terms(ts -> ts.value(values))))
                            .should(s -> s.terms(t -> t.field("tags.keyword").terms(ts -> ts.value(values))))
                            .minimumShouldMatch("1")
                    ));
                }
            }

            // price
            if (min != null || max != null) {
                b.filter(f -> f.range(r -> {
                    r.field("productPrice");
                    if (min != null) r.gte(JsonData.of(min));
                    if (max != null) r.lte(JsonData.of(max));
                    return r;
                }));
            }

            // chỉ sản phẩm đang giảm
            if (Boolean.TRUE.equals(discountOnly)) {
                b.filter(f -> f.range(r -> r.field("percentDiscount").gt(JsonData.of(0))));
            }

            SearchRequest req = SearchRequest.of(s -> s
                    .index(INDEX_NAME)
                    .from(page * size)
                    .size(size)
                    .query(qb -> qb.bool(b.build()))
                    .sort(sortOf(sort))
                    .aggregations("productTypeAgg", a -> a.terms(t -> t.field("productType.keyword").size(200)))
                    .aggregations("salesRankAgg",  a -> a.terms(t -> t.field("salesRank.keyword").size(200)))
                    .aggregations("tagsAgg",       a -> a.terms(t -> t.field("tags.keyword").size(200)))
                    .aggregations("discountingAgg",a -> a.filter(fa -> fa.range(r -> r.field("percentDiscount").gt(JsonData.of(0)))))
                    .trackTotalHits(t -> t.enabled(true))
            );

            SearchResponse<ProductDocument> resp = elasticsearchClient.search(req, ProductDocument.class);

            // hits
            List<ProductDocument> content = resp.hits().hits().stream()
                    .map(Hit::source).filter(Objects::nonNull).toList();

            long total = resp.hits().total() != null ? resp.hits().total().value() : content.size();
            int totalPages = size == 0 ? 1 : (int) Math.ceil((double) total / size);

            // ---- helper: chuyển Aggregate -> buckets (8.11: sterms().buckets().array() hoặc keyed()) ----
            java.util.function.Function<Aggregate, List<FacetBucket>> toBuckets = agg -> {
                if (agg == null || agg.sterms() == null || agg.sterms().buckets() == null) return List.of();

                var buckets = agg.sterms().buckets();

                if (buckets.array() != null) {
                    return buckets.array().stream()
                            .map(bk -> new FacetBucket(
                                    // key có thể là string hoặc number; dùng ._toJsonString() an toàn
                                    bk.key()._toJsonString().replace("\"", ""),
                                    bk.docCount()
                            ))
                            .toList();
                }
                if (buckets.keyed() != null) {
                    return buckets.keyed().values().stream()
                            .map(bk -> new FacetBucket(
                                    bk.key()._toJsonString().replace("\"", ""),
                                    bk.docCount()
                            ))
                            .toList();
                }
                return List.of();
            };

            var aggs = resp.aggregations();
            var typeBuckets = toBuckets.apply(aggs.get("productTypeAgg"));
            var rankBuckets = toBuckets.apply(aggs.get("salesRankAgg"));
            var tagBuckets  = toBuckets.apply(aggs.get("tagsAgg"));

            long discountingCount = 0L;
            var dAgg = aggs.get("discountingAgg");
            if (dAgg != null && dAgg.filter() != null) {
                discountingCount = dAgg.filter().docCount();
            }

            return new EsSearchResult<>(
                    content, total, totalPages,
                    typeBuckets, rankBuckets, tagBuckets,
                    discountingCount
            );

        } catch (Exception e) {
            log.error("searchByStoreWithFacets error: {}", e.getMessage(), e);
            return new EsSearchResult<>(List.of(), 0, 0, List.of(), List.of(), List.of(), 0);
        }
    }
    // SearchServiceImpl.java
    @Override
    public List<ProductDocument> getTopSellers(int size, Integer days, String statusesCsv, Long storeId) {
        int limit = Math.max(1, Math.min(size, 50));
        if (statusesCsv == null || statusesCsv.isBlank()) {
            statusesCsv = "delivered,shipped,packed";
        }

        // 1) Lấy top productId từ order-service
        List<TopProductDTO> top = orderServiceProxy.getTopProducts(limit, days, statusesCsv, storeId);
        if (top == null || top.isEmpty()) return Collections.emptyList();

        List<Long> ids = top.stream().map(TopProductDTO::getProductId).toList();
        Map<Long, Long> soldMap = top.stream().collect(Collectors.toMap(
                TopProductDTO::getProductId, TopProductDTO::getTotalQuantity));

        // 2) Lấy ProductDocument theo productId, giữ đúng thứ tự
        Query q = Query.of(b -> b.terms(t -> t
                .field("productId") // <- đảm bảo field này tồn tại trong ProductDocument mapping
                .terms(v -> v.value(ids.stream().map(FieldValue::of).toList()))
        ));

        var nativeQ = NativeQuery.builder().withQuery(q).withPageable(PageRequest.of(0, limit)).build();
        SearchHits<ProductDocument> hits = elasticsearchOperations.search(nativeQ, ProductDocument.class);

        Map<Long, ProductDocument> byId = hits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .filter(d -> d.getProductId() != null)
                .collect(Collectors.toMap(ProductDocument::getProductId, d -> d, (a,b)->a));

        List<ProductDocument> out = new ArrayList<>();
        for (Long id : ids) {
            ProductDocument doc = byId.get(id);
            if (doc != null) {
                doc.setSoldCount(soldMap.getOrDefault(id, 0L));
                out.add(doc);
            }
        }
        return out;
    }


}