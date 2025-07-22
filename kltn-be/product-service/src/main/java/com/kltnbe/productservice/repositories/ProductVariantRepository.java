package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
    List<ProductVariant> findByProduct_ProductId(Long productId);

    @Query("SELECT pv FROM ProductVariant pv WHERE pv.product.productId = :productId AND pv.size.sizeId = :sizeId AND pv.color.ColorId = :colorId")
    Optional<ProductVariant> findByProductVariant(@Param("productId") Long productId,
                                                  @Param("sizeId") Long sizeId,
                                                  @Param("colorId") Long colorId);
    @Query("SELECT pv FROM ProductVariant pv " +
            "WHERE pv.product.productId = :productId " +
            "AND pv.color.nameColor = :colorName " +
            "AND pv.size.sizeName = :sizeName")
    Optional<ProductVariant> findVariant(
            @Param("productId") Long productId,
            @Param("colorName") String colorName,
            @Param("sizeName") String sizeName);
}
