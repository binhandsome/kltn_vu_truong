// Service: ProductService.java
package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.req.ProductFilterRequest;
import com.kltnbe.productservice.dtos.res.ProductFilterResponse;
import com.kltnbe.productservice.dtos.res.ProductSearchResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Page<ProductSearchResponse> searchProducts(String keyword, Pageable pageable);
    Page<ProductFilterResponse> filterProducts(ProductFilterRequest request);
}