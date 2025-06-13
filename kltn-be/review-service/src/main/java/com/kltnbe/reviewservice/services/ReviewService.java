package com.kltnbe.reviewservice.services;

import com.kltnbe.reviewservice.dtos.ReviewDTO;

import java.util.List;

public interface ReviewService {
    ReviewDTO createReview(ReviewDTO reviewDTO, String username);
    List<ReviewDTO> getReviewsByProductAsin(String productAsin);
    List<ReviewDTO> getReviewsByUserId(Long userId);
    void respondToReview(Long reviewId, String response);
}