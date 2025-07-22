package com.kltnbe.productservice.services;

import com.kltnbe.productservice.clients.UserServiceProxy;
import com.kltnbe.productservice.dtos.UserDTO;
import com.kltnbe.productservice.dtos.req.ReviewRequest;
import com.kltnbe.productservice.dtos.res.ReviewResponse;
import com.kltnbe.productservice.entities.ProductReview;
import com.kltnbe.productservice.repositories.ProductReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductReviewServiceImpl implements ProductReviewService {

    private final ProductReviewRepository reviewRepository;
    private final UserServiceProxy userServiceProxy;

    @Override
    public ReviewResponse createReview(String token, ReviewRequest request) {
        Long userId = request.getUserId();
        UserDTO user = userServiceProxy.getUserInfoById(userId);

        ProductReview review = new ProductReview();
        review.setProductAsin(request.getProductAsin());
        review.setComment(request.getComment());
        review.setUserId(user.getUserId());
        review.setCreatedAt(LocalDateTime.now());
        review.setParentId(request.getParentId());

        // ✅ Phân biệt logic review chính và reply để không violate CHECK constraint
        if (request.getParentId() == null) {
            // Đây là bình luận gốc → cần rating hợp lệ
            if (request.getRating() == null || request.getRating() < 1 || request.getRating() > 5) {
                throw new IllegalArgumentException("Rating must be from 1 to 5 for root reviews.");
            }
            review.setRating(request.getRating());
        } else {
            // Đây là reply → không được có rating
            if (request.getRating() != null) {
                throw new IllegalArgumentException("Replies must not contain rating.");
            }
            review.setRating(null);
        }

        reviewRepository.save(review);

        ReviewResponse response = new ReviewResponse();
        response.setReviewId(review.getId());
        response.setProductAsin(review.getProductAsin());
        response.setUserId(review.getUserId());
        response.setComment(review.getComment());
        response.setRating(review.getRating());
        response.setCreatedAt(review.getCreatedAt());
        response.setUsername(user.getUsername());
        response.setAvatar(user.getProfilePicture());

        return response;
    }

    @Override
    public List<ReviewResponse> getReviewsByProduct(String asin) {
        List<ProductReview> reviews = reviewRepository.findByProductAsin(asin);

        return reviews.stream().map(review -> {
            ReviewResponse res = new ReviewResponse();
            res.setReviewId(review.getId());
            res.setProductAsin(review.getProductAsin());
            res.setRating(review.getRating());
            res.setComment(review.getComment());
            res.setUserId(review.getUserId());
            res.setCreatedAt(review.getCreatedAt());

            // ✅ Thêm dòng này
            res.setParentId(review.getParentId());

            try {
                UserDTO user = userServiceProxy.getUserInfoById(review.getUserId());
                res.setUsername(user.getUsername());
                res.setAvatar(user.getProfilePicture());
            } catch (Exception e) {
                res.setUsername("Ẩn danh");
            }

            return res;
        }).collect(Collectors.toList());
    }

}
