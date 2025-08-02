package com.kltnbe.orderservice.helpers;

import com.kltnbe.orderservice.dtos.ProductSimpleDTO;
import com.kltnbe.orderservice.dtos.ProductVariantDTO;
import com.kltnbe.orderservice.dtos.req.InventoryReduceRequest;
import com.kltnbe.orderservice.dtos.res.ProductResponse;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(name = "product-service", configuration = FeignInternalAuthConfig.class)
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
    @GetMapping("/api/products/internal/by-store/{storeId}")
    ResponseEntity<List<Long>> getProductIdsByStore(@PathVariable Long storeId);
    @GetMapping("/api/products/findProductNameById")
    ResponseEntity<Optional<String>> findProductNameById(@RequestParam Long productId);
    @GetMapping("/api/products/getProductById")
    ResponseEntity<ProductResponse> getProductById(@RequestParam Long idProduct );

    @GetMapping("/api/products/getStoreIdByProductId")
    public ResponseEntity<Long> getStoreIdByProductId(@RequestParam Long productId);
}
