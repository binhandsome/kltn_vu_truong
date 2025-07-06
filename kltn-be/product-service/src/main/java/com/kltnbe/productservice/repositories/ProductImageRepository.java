package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.ProductImage;
import com.kltnbe.productservice.entities.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<ProductImage> findByProductAsin(String asin);

}
