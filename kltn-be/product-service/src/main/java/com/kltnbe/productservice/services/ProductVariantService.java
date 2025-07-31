package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.ProductVariantDTO;
import com.kltnbe.productservice.entities.ProductVariant;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductVariantService {
    ProductVariantDTO createVariant(ProductVariantDTO dto, Long authId);

    ProductVariantDTO updateStock(Long variantId, int quantitySold, Long authId);

    List<ProductVariantDTO> getVariantsByProduct(Long productId, Long authId);

    Optional<ProductVariant> findByProductVariant(Long productId, Long sizeId, Long colorId);

    void updateVariant(Long variantId, BigDecimal price, int quantity, Long authId);

    Optional<ProductVariant> getVariantById(Long variantId);

    void deleteVariant(Long variantId, Long authId);
}