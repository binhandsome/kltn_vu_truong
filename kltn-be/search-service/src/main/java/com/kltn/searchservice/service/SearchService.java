package com.kltn.searchservice.service;

import com.kltn.searchservice.dtos.ProductDocument;
import com.kltn.searchservice.dtos.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

public interface SearchService {
    void syncProducts() throws IOException;
    void indexProduct(ProductDto productDto) throws IOException;
    Page<ProductDocument> searchProductByTitle(String keyword, Pageable pageable) throws IOException;
    Page<ProductDocument> searchByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    Page<ProductDocument> searchByKeywordAndPrice(
            String keyword,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable
    );

    }
