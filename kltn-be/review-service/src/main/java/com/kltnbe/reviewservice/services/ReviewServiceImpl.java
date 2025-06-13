package com.kltnbe.reviewservice.services;

import com.kltnbe.reviewservice.dtos.ProductDTO;
import com.kltnbe.reviewservice.dtos.ReviewDTO;
import com.kltnbe.reviewservice.dtos.UserDTO;
import com.kltnbe.reviewservice.entities.Review;
import com.kltnbe.reviewservice.enums.ReviewStatus;
import com.kltnbe.reviewservice.repositories.ReviewRepository;
import com.kltnbe.reviewservice.clients.UserClient;
import com.kltnbe.reviewservice.clients.ProductClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserClient userClient;
    @Autowired
    private ProductClient productClient;

    @Override
    public ReviewDTO createReview(ReviewDTO reviewDTO, String username) {
        UserDTO user = userClient.findUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("Người dùng không tồn tại");
        }

        ProductDTO product = productClient.getProductByAsin(reviewDTO.getProductAsin());
        if (product == null) {
            throw new RuntimeException("Sản phẩm không tồn tại");
        }

        Review review = convertToEntity(reviewDTO);
        review.setUserId(user.getUserId());
        review.setCreatedAt(new Date());
        review.setUpdatedAt(new Date());
        review.setIsVerified(false);
        if (reviewDTO.getStatus() != null) {
            try {
                review.setStatus(ReviewStatus.valueOf(reviewDTO.getStatus().toLowerCase()));
            } catch (IllegalArgumentException e) {
                review.setStatus(ReviewStatus.active);
            }
        }
        review = reviewRepository.save(review);

        return convertToDto(review);
    }

    @Override
    public List<ReviewDTO> getReviewsByProductAsin(String productAsin) {
        List<Review> reviews = reviewRepository.findByProductAsin(productAsin);
        return reviews.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<ReviewDTO> getReviewsByUserId(Long userId) {
        List<Review> reviews = reviewRepository.findByUserId(userId);
        return reviews.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public void respondToReview(Long reviewId, String response) {
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        reviewOptional.ifPresent(review -> {
            review.setSellerResponse(response); // Sử dụng phương thức từ entity
            review.setUpdatedAt(new Date());
            reviewRepository.save(review);
        });
    }

    private Review convertToEntity(ReviewDTO reviewDTO) {
        Review review = new Review();
        review.setProductAsin(reviewDTO.getProductAsin());
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setImage(reviewDTO.getImage());
        if (reviewDTO.getStatus() != null) {
            try {
                review.setStatus(ReviewStatus.valueOf(reviewDTO.getStatus().toLowerCase()));
            } catch (IllegalArgumentException e) {
                review.setStatus(ReviewStatus.active);
            }
        }
        review.setStarVote(reviewDTO.getStarVote());
        review.setSellerResponse(reviewDTO.getSellerResponse()); // Sử dụng sellerResponse
        return review;
    }

    private ReviewDTO convertToDto(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(review.getReviewId());
        dto.setUserId(review.getUserId());
        dto.setProductAsin(review.getProductAsin());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        dto.setUpdatedAt(review.getUpdatedAt());
        dto.setIsVerified(review.getIsVerified());
        dto.setImage(review.getImage());
        dto.setStatus(review.getStatus() != null ? review.getStatus().name() : null);
        dto.setStarVote(review.getStarVote());
        dto.setSellerResponse(review.getSellerResponse()); // Sử dụng sellerResponse
        return dto;
    }
}