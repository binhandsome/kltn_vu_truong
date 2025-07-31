package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.dtos.req.ReviewRequest;
import com.kltnbe.productservice.dtos.res.ReviewResponse;
import com.kltnbe.productservice.services.ProductReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ProductReviewController {

    private final ProductReviewService reviewService;

    // Tạo review gốc bởi user
    // Vẫn OK, giữ nguyên
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


}
