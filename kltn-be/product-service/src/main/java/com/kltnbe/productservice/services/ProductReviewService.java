package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.req.ReviewRequest;
import com.kltnbe.productservice.dtos.res.ReviewResponse;

import java.util.List;

public interface ProductReviewService {
    ReviewResponse createReview(String token, ReviewRequest request);
    List<ReviewResponse> getReviewsByProduct(String asin);
}