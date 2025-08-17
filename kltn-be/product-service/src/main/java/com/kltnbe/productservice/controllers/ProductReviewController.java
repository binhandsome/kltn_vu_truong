package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.dtos.req.ReviewRequest;
import com.kltnbe.productservice.dtos.req.SellerReplyRequest;
import com.kltnbe.productservice.dtos.res.ReviewResponse;
import com.kltnbe.productservice.entities.ProductReview;
import com.kltnbe.productservice.services.ProductReviewService;
import com.kltnbe.productservice.services.ProductReviewServiceImpl;
import com.kltnbe.security.utils.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ProductReviewController {

    private final ProductReviewService reviewService;
    private final ProductReviewServiceImpl productReviewServiceImpl;

    @PostMapping("/create")
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest request) {
        request.setIsSellerReply(false);
        ReviewResponse response = reviewService.createReview(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{asin}")
    public ResponseEntity<List<ReviewResponse>> getReviews(
            @PathVariable String asin,
            @RequestParam Long authId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(asin, authId));
    }
    @GetMapping("/public/{asin}")
    public ResponseEntity<List<ReviewResponse>> getPublicReviews(
            @PathVariable String asin) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(asin, null));
    }

    @PostMapping("/{reviewId}/reply")
    public ResponseEntity<ReviewResponse> createSellerReply(
            @PathVariable Long reviewId,
            @RequestBody ReviewRequest request,
            @RequestParam Long authId) {

        request.setParentId(reviewId);
        request.setIsSellerReply(false);
        request.setUserId(authId); // đã truyền qua request param
        return ResponseEntity.ok(reviewService.createReview(request));
    }
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> deleteReview(@PathVariable Long reviewId,
                                                       @RequestParam Long authId) {
        ReviewResponse response = reviewService.deleteReview(reviewId, authId);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{reviewId}/user")
    public ResponseEntity<Void> deleteReviewByUser(
            @PathVariable Long reviewId,
            @RequestParam Long authId) {
        reviewService.deleteReviewByUser(reviewId, authId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long reviewId,
            @RequestBody ReviewRequest request,
            @RequestParam Long authId) {
        request.setUserId(authId);
        ReviewResponse updated = reviewService.updateReview(reviewId, request);
        return ResponseEntity.ok(updated);
    }
    @PutMapping("/{replyId}/reply")
    public ResponseEntity<ReviewResponse> updateSellerReply(
            @PathVariable Long replyId,
            @RequestBody SellerReplyRequest request,
            @RequestParam Long authId
    ) {
        ReviewResponse response = reviewService.updateSellerReply(replyId, request, authId);
        return ResponseEntity.ok(response);
    }

}
