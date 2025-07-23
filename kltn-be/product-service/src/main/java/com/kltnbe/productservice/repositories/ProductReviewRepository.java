package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    List<ProductReview> findByProductAsin(String asin);
    boolean existsByProductAsinAndUserId(String asin, Long userId);
}