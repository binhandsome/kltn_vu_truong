package com.kltnbe.orderservice.helpers;

import com.kltnbe.orderservice.dtos.ProductSimpleDTO;
import com.kltnbe.orderservice.dtos.ProductVariantDTO;
import com.kltnbe.orderservice.dtos.req.InventoryReduceRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(url = "http://localhost:8083", name = "product-service")
public interface ProductServiceProxy {

    @PostMapping("/api/products/listByIds")
    List<ProductSimpleDTO> getProductsByIds(@RequestBody List<Long> ids);

    @GetMapping("/api/products/seller/{variantId}")
    ProductVariantDTO getProduct(
            @PathVariable Long variantId,
            @RequestHeader("Authorization") String token
    );
    @GetMapping("/api/products/color-id")
    Long getColorIdByName(@RequestParam("nameColor") String nameColor);

    @GetMapping("/api/products/size-id")
    Long getSizeIdByName(@RequestParam("sizeName") String sizeName);
    @GetMapping("/api/products/color-name")
    String getColorNameById(@RequestParam("id") Long colorId);
    @PostMapping("/api/products/reduce-inventory")
    void reduceInventory(@RequestBody List<InventoryReduceRequest> requestList);
}
