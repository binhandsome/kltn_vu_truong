package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    List<ProductReview> findByProductAsin(String asin);
    boolean existsByProductAsinAndUserId(String asin, Long userId);

    List<ProductReview> findByProductAsinAndParentIdIsNull(String asin);

    List<ProductReview> findByParentId(Long parentId);



}