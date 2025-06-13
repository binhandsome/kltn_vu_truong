package com.kltnbe.sellerservice.controllers;

import com.kltnbe.sellerservice.dtos.StoreDTO;
import com.kltnbe.sellerservice.dtos.ProductVariantDTO;
import com.kltnbe.sellerservice.services.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/seller")
public class SellerController {
    @Autowired
    private SellerService sellerService;

    @PostMapping("/store")
    public ResponseEntity<StoreDTO> createStore(@RequestBody StoreDTO storeDTO, @RequestHeader("Authorization") String token) {
        StoreDTO createdStore = sellerService.createStore(storeDTO, token);
        return ResponseEntity.ok(createdStore);
    }

    @GetMapping("/stores/{storeId}")
    public ResponseEntity<StoreDTO> getStore(@PathVariable Long storeId) {
        StoreDTO store = sellerService.getStore(storeId);
        return ResponseEntity.ok(store);
    }

    @PutMapping("/stores/{storeId}")
    public ResponseEntity<StoreDTO> updateStore(@PathVariable Long storeId, @RequestBody StoreDTO storeDTO) {
        StoreDTO updatedStore = sellerService.updateStore(storeId, storeDTO);
        return ResponseEntity.ok(updatedStore);
    }

    @DeleteMapping("/stores/{storeId}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long storeId) {
        sellerService.deleteStore(storeId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/products")
    public ResponseEntity<ProductVariantDTO> createProduct(@RequestBody ProductVariantDTO variantDTO, @RequestHeader("Authorization") String token) {
        ProductVariantDTO createdVariant = sellerService.createProduct(variantDTO, token);
        return ResponseEntity.ok(createdVariant);
    }

    @GetMapping("/products/{variantId}")
    public ResponseEntity<ProductVariantDTO> getProduct(@PathVariable Long variantId, @RequestHeader("Authorization") String token) {
        ProductVariantDTO variant = sellerService.getProduct(variantId, token);
        return ResponseEntity.ok(variant);
    }

    @PutMapping("/products/{variantId}")
    public ResponseEntity<ProductVariantDTO> updateProduct(@PathVariable Long variantId, @RequestBody ProductVariantDTO variantDTO, @RequestHeader("Authorization") String token) {
        ProductVariantDTO updatedVariant = sellerService.updateProduct(variantId, variantDTO, token);
        return ResponseEntity.ok(updatedVariant);
    }

    @DeleteMapping("/products/{variantId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long variantId, @RequestHeader("Authorization") String token) {
        sellerService.deleteProduct(variantId, token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/revenue")
    public ResponseEntity<BigDecimal> getRevenue(@RequestHeader("Authorization") String token) {
        BigDecimal revenue = sellerService.getRevenue(token);
        return ResponseEntity.ok(revenue);
    }

    @PostMapping("/reviews/{reviewId}/response")
    public ResponseEntity<String> respondToReview(@PathVariable Long reviewId, @RequestBody String response) {
        sellerService.respondToReview(reviewId, response);
        return ResponseEntity.ok("Phản hồi đã được gửi");
    }
}