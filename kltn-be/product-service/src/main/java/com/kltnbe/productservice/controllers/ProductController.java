package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.dtos.ProductDTO;
import com.kltnbe.productservice.dtos.ProductVariantDTO;
import com.kltnbe.productservice.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String keyword) {
        List<ProductDTO> products = productService.searchProducts(keyword);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ProductDTO>> filterProducts(@RequestParam(required = false) String category, @RequestParam(required = false) String brand) {
        List<ProductDTO> products = productService.filterProducts(category, brand);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/seller")
    public ResponseEntity<ProductVariantDTO> createProduct(@RequestBody ProductVariantDTO variantDTO, @RequestHeader("Authorization") String token) {
        ProductVariantDTO createdVariant = productService.createVariant(variantDTO);
        return ResponseEntity.ok(createdVariant);
    }

    @GetMapping("/seller/{variantId}")
    public ResponseEntity<ProductVariantDTO> getProduct(@PathVariable Long variantId, @RequestHeader("Authorization") String token) {
        ProductVariantDTO variant = productService.getVariantById(variantId);
        return ResponseEntity.ok(variant);
    }

    @PutMapping("/seller/{variantId}")
    public ResponseEntity<ProductVariantDTO> updateProduct(@PathVariable Long variantId, @RequestBody ProductVariantDTO variantDTO, @RequestHeader("Authorization") String token) {
        ProductVariantDTO updatedVariant = productService.updateVariant(variantId, variantDTO);
        return ResponseEntity.ok(updatedVariant);
    }

    @DeleteMapping("/seller/{variantId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long variantId, @RequestHeader("Authorization") String token) {
        productService.deleteVariant(variantId);
        return ResponseEntity.ok().build();
    }
}