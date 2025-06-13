package com.kltnbe.reviewservice.clients;

import com.kltnbe.reviewservice.dtos.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service", contextId = "productClient")
public interface ProductClient {
    @GetMapping("/api/products/asin/{productAsin}")
    ProductDTO getProductByAsin(@PathVariable("productAsin") String productAsin);
}