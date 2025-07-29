package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.ProductVariantDTO;
import com.kltnbe.productservice.entities.ProductVariant;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductVariantService {
    ProductVariantDTO createVariant(ProductVariantDTO dto);
    ProductVariantDTO updateStock(Long variantId, int quantitySold);
    List<ProductVariantDTO> getVariantsByProduct(Long productId);
    Optional<ProductVariant> findByProductVariant(Long productId, Long sizeId, Long colorId);
    void updateVariant(Long variantId, BigDecimal price, int quantity);
    Optional<ProductVariant> getVariantById(Long variantId);
    void deleteVariant(Long variantId);
}