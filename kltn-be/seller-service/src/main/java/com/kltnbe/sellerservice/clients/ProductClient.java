package com.kltnbe.sellerservice.clients;

import com.kltnbe.sellerservice.dtos.ProductVariantDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "product-service", url = "http://localhost:8082")
public interface ProductClient {
    @PostMapping("/api/products/seller")
    ProductVariantDTO createProduct(@RequestBody ProductVariantDTO variantDTO, @RequestHeader("Authorization") String token);

    @GetMapping("/api/products/seller/{variantId}")
    ProductVariantDTO getProduct(@PathVariable Long variantId, @RequestHeader("Authorization") String token);

    @PutMapping("/api/products/seller/{variantId}")
    ProductVariantDTO updateProduct(@PathVariable Long variantId, @RequestBody ProductVariantDTO variantDTO, @RequestHeader("Authorization") String token);

    @DeleteMapping("/api/products/seller/{variantId}")
    void deleteProduct(@PathVariable Long variantId, @RequestHeader("Authorization") String token);
}