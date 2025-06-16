package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.dtos.req.ProductFilterRequest;
import com.kltnbe.productservice.dtos.res.ProductFilterResponse;
import com.kltnbe.productservice.dtos.res.ProductSearchResponse;
import com.kltnbe.productservice.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/search")
    public Page<ProductSearchResponse> search(@RequestParam String keyword,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.searchProducts(keyword, pageable);
    }
    @GetMapping("/filter")
    public Page<ProductFilterResponse> filterProducts(@RequestBody ProductFilterRequest request) {
        return productService.filterProducts(request);
    }
}