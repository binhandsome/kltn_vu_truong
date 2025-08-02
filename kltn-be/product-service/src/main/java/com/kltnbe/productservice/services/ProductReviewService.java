package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.req.ReviewRequest;
import com.kltnbe.productservice.dtos.req.SellerReplyRequest;
import com.kltnbe.productservice.dtos.res.ReviewResponse;
import com.kltnbe.productservice.entities.ProductReview;

import java.util.List;

public interface ProductReviewService {
    ReviewResponse createReview(ReviewRequest request);

    List<ReviewResponse> getReviewsByProduct(String asin, Long authId);
    ReviewResponse deleteReview(Long reviewId, Long authId);
    void deleteReviewByUser(Long reviewId, Long authId);
    ReviewResponse updateReview(Long reviewId, ReviewRequest request);
    ReviewResponse updateSellerReply(Long replyId, SellerReplyRequest request, Long sellerId);

}