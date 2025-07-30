package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.dtos.ProductVariantDTO;
import com.kltnbe.productservice.entities.ProductVariant;
import com.kltnbe.productservice.services.ProductVariantService;
import com.kltnbe.security.utils.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product-variants")
@RequiredArgsConstructor
public class ProductVariantController {

    private final ProductVariantService productVariantService;

    @PostMapping
    public ResponseEntity<ProductVariantDTO> createVariant(
            @RequestBody ProductVariantDTO dto,
            @RequestParam Long authId
    ) {
        return ResponseEntity.ok(productVariantService.createVariant(dto, authId));
    }

    @PutMapping("/{variantId}/sell")
    public ResponseEntity<ProductVariantDTO> sellVariant(
            @PathVariable Long variantId,
            @RequestParam int quantity,
            @RequestParam Long authId
    ) {
        return ResponseEntity.ok(productVariantService.updateStock(variantId, quantity, authId));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<List<ProductVariantDTO>> getVariantsByProduct(
            @PathVariable Long productId,
            @RequestParam Long authId
    ) {
        return ResponseEntity.ok(productVariantService.getVariantsByProduct(productId, authId));
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
    @PutMapping("/variants/{variantId}")
    public ResponseEntity<?> updateVariant(
            @PathVariable Long variantId,
            @RequestParam BigDecimal price,
            @RequestParam Integer quantity,
            @RequestParam Long authId
    ) {
        productVariantService.updateVariant(variantId, price, quantity, authId);
        return ResponseEntity.ok("Đã cập nhật biến thể");
    }

    @GetMapping("/detail/{variantId}")
    public ResponseEntity<?> getVariant(@PathVariable Long variantId) {
        Optional<ProductVariant> optionalVariant = productVariantService.getVariantById(variantId);
        if (optionalVariant.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Variant not found");
        }

        try {
            ProductVariant variant = optionalVariant.get();

            ProductVariantDTO dto = new ProductVariantDTO();
            dto.setVariantId(variant.getVariantId());
            dto.setSizeId(variant.getSize() != null ? variant.getSize().getSizeId() : null);
            dto.setColorId(variant.getColor() != null ? variant.getColor().getColorId() : null);
            dto.setPrice(variant.getPrice());
            dto.setQuantityInStock(variant.getQuantityInStock());
            dto.setQuantitySold(variant.getQuantitySold());
            dto.setStatus(variant.getStatus().name());

            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi xử lý biến thể");
        }
    }
    @DeleteMapping("/variants/{variantId}")
    public ResponseEntity<?> deleteVariant(
            @PathVariable Long variantId,
            @RequestParam Long authId
    ) {
        productVariantService.deleteVariant(variantId, authId);
        return ResponseEntity.ok("Đã xoá biến thể");
    }

}
