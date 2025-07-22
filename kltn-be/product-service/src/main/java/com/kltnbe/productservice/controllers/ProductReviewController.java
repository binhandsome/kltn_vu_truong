package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.dtos.req.ReviewRequest;
import com.kltnbe.productservice.dtos.res.ReviewResponse;
import com.kltnbe.productservice.services.ProductReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ProductReviewController {

    private final ProductReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<?> createReview(
            @RequestHeader("Authorization") String token,
            @RequestBody ReviewRequest request) {

        ReviewResponse response = reviewService.createReview(token.replace("Bearer ", ""), request);
        return ResponseEntity.ok(response); // trả về review vừa tạo
    }

    @GetMapping("/{asin}")
    public ResponseEntity<List<ReviewResponse>> getReviews(@PathVariable String asin) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(asin));
    }
}