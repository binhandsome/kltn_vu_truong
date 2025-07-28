package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductImage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findByProduct(Product product);
    @Modifying
    @Transactional
    @Query("UPDATE ProductImage pi SET pi.isMainImage = 0 WHERE pi.product.asin = :asin")
    void resetMainImageByAsin(String asin);

    @Modifying
    @Transactional
    @Query("UPDATE ProductImage pi SET pi.isMainImage = 1 WHERE pi.imageId = :imageId")
    void setMainImage(Long imageId);
}
