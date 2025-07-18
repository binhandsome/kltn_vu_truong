package com.kltnbe.orderservice.helpers;

import com.kltnbe.orderservice.dtos.ProductSimpleDTO;
import com.kltnbe.orderservice.dtos.ProductVariantDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "product-service")
public interface ProductServiceProxy {

    @PostMapping("/api/products/listByIds")
    List<ProductSimpleDTO> getProductsByIds(@RequestBody List<Long> ids);

    @GetMapping("/api/products/seller/{variantId}")
    ProductVariantDTO getProduct(
            @PathVariable Long variantId,
            @RequestHeader("Authorization") String token
    );
}
