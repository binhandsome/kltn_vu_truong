package com.kltn.searchservice.service;

import com.kltn.searchservice.dtos.EsSearchResult;
import com.kltn.searchservice.dtos.ProductDocument;
import com.kltn.searchservice.dtos.ProductDto;
import com.kltn.searchservice.dtos.req.RequestRecommend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface SearchService {
    void syncProducts() throws IOException;

    void indexProduct(ProductDto productDto) throws IOException;
    void updateProduct(ProductDto productDto) throws IOException;
    void updateProductThumbnail(Long productId, String productThumbnail) throws IOException;
    //    Page<ProductDocument> searchProductByTitle(String keyword, Pageable pageable) throws IOException;
//    Page<ProductDocument> searchByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
//    Page<ProductDocument> searchByKeywordAndPrice(
//            String keyword,
//            BigDecimal minPrice,
//            BigDecimal maxPrice,
//            Pageable pageable
//    );
    ProductDto getProductById(Long productId);
    ProductDto getProductByAsin(String asin);
    Page<ProductDocument> searchProductsByStoreIdAndStatus(Long storeId, String status, int page, int size);

    Page<ProductDocument> searchAdvanced(String keyword,
                                         BigDecimal minPrice,
                                         BigDecimal maxPrice,
                                         List<String> tags,
                                         Pageable pageable
    );

    Page<ProductDocument> searchProductRecommend(RequestRecommend request);
    List<ProductDocument> getRecommendByAsin(String asin);
    Page<ProductDocument> searchAdvancedSeller(
            String keyword,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            List<String> tags,
            Long storeId,
            List<String> status,
            List<Double> percentDiscount,
            Pageable pageable
    );
    Map<String, List<ProductDocument>> getRecommendByAsins(List<String> asins);
    EsSearchResult<ProductDocument> searchByStoreWithFacets(
            Long storeId, String q, String sort, String category,
            Double min, Double max, Boolean discountOnly,
            int page, int size);
}
