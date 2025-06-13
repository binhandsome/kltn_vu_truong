package com.kltnbe.cartservice.clients;

import com.kltnbe.cartservice.dtos.ProductDTO;
import com.kltnbe.cartservice.dtos.ProductVariantDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "product-service", contextId = "productClient")
public interface ProductClient {
    @GetMapping("/api/products/asin/{productAsin}")
    ProductDTO getProductByAsin(@PathVariable("productAsin") String productAsin);

    @GetMapping("/api/products/variants/{variantId}")
    ProductVariantDTO getVariantById(@PathVariable("variantId") Long variantId);
}