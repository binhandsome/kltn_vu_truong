package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.dtos.ProductVariantDTO;
import com.kltnbe.productservice.entities.ProductVariant;
import com.kltnbe.productservice.services.ProductVariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product-variants")
@RequiredArgsConstructor
public class ProductVariantController {

    private final ProductVariantService productVariantService;

    @PostMapping
    public ResponseEntity<ProductVariantDTO> createVariant(@RequestBody ProductVariantDTO dto) {
        return ResponseEntity.ok(productVariantService.createVariant(dto));
    }

    @PutMapping("/{variantId}/sell")
    public ResponseEntity<ProductVariantDTO> sellVariant(
        @PathVariable Long variantId,
        @RequestParam int quantity
    ) {
        return ResponseEntity.ok(productVariantService.updateStock(variantId, quantity));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<ProductVariantDTO>> getVariantsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(productVariantService.getVariantsByProduct(productId));
    }
    @GetMapping("/available-stock")
    public ResponseEntity<Integer> getAvailableStock(
            @RequestParam Long productId,
            @RequestParam Long sizeId,
            @RequestParam Long colorId) {
        Optional<ProductVariant> variantOpt = productVariantService
                .findByProductVariant(productId, sizeId, colorId);

        if (variantOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        int quantityInStock = variantOpt.get().getQuantityInStock();
        return ResponseEntity.ok(quantityInStock);
    }
}
