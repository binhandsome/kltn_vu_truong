package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.ProductVariantDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "product-service", url = "http://localhost:8082")
public interface ProductClient {
    @GetMapping("/api/products")
    List<ProductVariantDTO> getAllProducts();
}