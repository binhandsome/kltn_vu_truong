package com.kltnbe.orderservice.clients;

import com.kltnbe.orderservice.dtos.ProductVariantDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "product-service", url = "http://localhost:8082")
public interface ProductClient {
    @GetMapping("/api/products/seller/{variantId}")
    ProductVariantDTO getProduct(@PathVariable Long variantId, @RequestHeader("Authorization") String token);
}