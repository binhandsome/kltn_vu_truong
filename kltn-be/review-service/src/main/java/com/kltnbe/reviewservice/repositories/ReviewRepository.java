package com.kltnbe.reviewservice.repositories;

import com.kltnbe.reviewservice.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductAsin(String productAsin);
    List<Review> findByUserId(Long userId);
}