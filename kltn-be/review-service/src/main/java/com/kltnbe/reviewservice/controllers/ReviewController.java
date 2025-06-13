package com.kltnbe.reviewservice.controllers;

import com.kltnbe.reviewservice.dtos.ReviewDTO;
import com.kltnbe.reviewservice.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO reviewDTO, @RequestHeader("Authorization") String token) {
        String username = extractUsernameFromToken(token); // Giả định
        ReviewDTO createdReview = reviewService.createReview(reviewDTO, username);
        return ResponseEntity.ok(createdReview);
    }

    @GetMapping("/product/{productAsin}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByProductAsin(@PathVariable String productAsin) {
        List<ReviewDTO> reviews = reviewService.getReviewsByProductAsin(productAsin);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByUserId(@PathVariable Long userId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/{reviewId}/response")
    public ResponseEntity<String> respondToReview(@PathVariable Long reviewId, @RequestBody String response) {
        reviewService.respondToReview(reviewId, response);
        return ResponseEntity.ok("Phản hồi đã được gửi");
    }

    private String extractUsernameFromToken(String token) {
        // Giả định logic lấy username từ token
        return "testuser"; // Placeholder
    }
}