package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
    Optional<ProductVariant> findByVariantId(Long variantId);
}