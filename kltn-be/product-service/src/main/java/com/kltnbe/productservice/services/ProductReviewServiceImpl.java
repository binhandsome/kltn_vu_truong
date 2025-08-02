package com.kltnbe.productservice.services;

import com.kltnbe.productservice.clients.SellerServiceProxy;
import com.kltnbe.productservice.clients.UserServiceProxy;
import com.kltnbe.productservice.dtos.ShopDTO;
import com.kltnbe.productservice.dtos.UserDTO;
import com.kltnbe.productservice.dtos.req.ReviewRequest;
import com.kltnbe.productservice.dtos.req.SellerReplyRequest;
import com.kltnbe.productservice.dtos.res.ReviewResponse;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductReview;
import com.kltnbe.productservice.repositories.ProductRepository;
import com.kltnbe.productservice.repositories.ProductReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductReviewServiceImpl implements ProductReviewService {

    private final ProductReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserServiceProxy userServiceProxy;
    private final SellerServiceProxy sellerServiceProxy;

    @Override
    public ReviewResponse createReview(ReviewRequest request) {
        Long userId = request.getUserId();
        boolean isReply = request.getParentId() != null;

        if (isReply) {
            if (!isSellerOwnerOfProduct(userId, request.getProductAsin())) {
                throw new AccessDeniedException("Chỉ cửa hàng sở hữu sản phẩm mới được phản hồi đánh giá.");
            }

            ProductReview parent = reviewRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Review cha không tồn tại."));
            if (parent.getParentId() != null) {
                throw new IllegalArgumentException("Chỉ được phản hồi lên review gốc, không cho lồng sâu.");
            }

            boolean alreadyReplied = reviewRepository.findByParentId(parent.getId()).stream()
                    .anyMatch(r -> isSellerOwnerOfProduct(r.getUserId(), parent.getProductAsin()));
            if (alreadyReplied) {
                throw new IllegalStateException("Cửa hàng đã phản hồi review này rồi.");
            }

            if (request.getRating() != null) {
                throw new IllegalArgumentException("Phản hồi từ cửa hàng không được chứa rating.");
            }
        } else {
            if (isSellerOwnerOfProduct(userId, request.getProductAsin())) {
                throw new IllegalArgumentException("Cửa hàng không được tự đánh giá sản phẩm của mình.");
            }

            if (request.getRating() == null || request.getRating() < 1 || request.getRating() > 5) {
                throw new IllegalArgumentException("Rating phải từ 1 đến 5 cho review gốc.");
            }
        }

        ProductReview review = new ProductReview();
        review.setProductAsin(request.getProductAsin());
        review.setComment(request.getComment());
        review.setUserId(userId);
        review.setCreatedAt(LocalDateTime.now());
        review.setParentId(request.getParentId());
        review.setRating(isReply ? null : request.getRating());

        reviewRepository.save(review);

        ReviewResponse response = toResponse(review);
        if (!isReply) {
            try {
                UserDTO user = userServiceProxy.getUserInfoById(userId);
                response.setUsername(user.getUsername());
                response.setAvatar(user.getProfilePicture() != null ? user.getProfilePicture() : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
            } catch (Exception e) {
                response.setUsername("Ẩn danh");
            }
        } else {
            response.setUsername("Cửa hàng");
            response.setAvatar("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
        }

        return response;
    }

    @Override
    public List<ReviewResponse> getReviewsByProduct(String asin, Long authId) {
        List<ProductReview> rootReviews = reviewRepository.findByProductAsinAndParentIdIsNull(asin);

        return rootReviews.stream().map(root -> {
            ReviewResponse res = toResponse(root);
            try {
                UserDTO user = userServiceProxy.getUserInfoById(root.getUserId());
                res.setUsername(user.getUsername());
                res.setAvatar(user.getProfilePicture() != null ? user.getProfilePicture() : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
            } catch (Exception e) {
                res.setUsername("Ẩn danh");
            }

            List<ProductReview> replies = reviewRepository.findByParentId(root.getId());
            for (ProductReview reply : replies) {
                if (isSellerOwnerOfProduct(reply.getUserId(), asin)) {
                    ReviewResponse sellerReply = toResponse(reply);
                    sellerReply.setUsername("Cửa hàng");
                    sellerReply.setAvatar("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
                    res.setSellerReply(sellerReply);
                    break;
                }
            }

            return res;
        }).collect(Collectors.toList());
    }


    private ReviewResponse toResponse(ProductReview review) {
        ReviewResponse res = new ReviewResponse();
        res.setReviewId(review.getId());
        res.setProductAsin(review.getProductAsin());
        res.setRating(review.getRating());
        res.setComment(review.getComment());
        res.setUserId(review.getUserId());
        res.setCreatedAt(review.getCreatedAt());
        res.setParentId(review.getParentId());
        return res;
    }

    private boolean isSellerOwnerOfProduct(Long authId, String productAsin) {
        try {
            Long shopId = sellerServiceProxy.getShopIdByAuthId(authId);
            if (shopId == null) return false;

            Product product = productRepository.findByAsin(productAsin)
                    .orElseThrow(() -> new IllegalArgumentException("Product không tồn tại: " + productAsin));

            return shopId.equals(product.getStoreId());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public ReviewResponse deleteReview(Long reviewId, Long authId) {
        ProductReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review không tồn tại"));

        if (!isSellerOwnerOfProduct(authId, review.getProductAsin())) {
            throw new AccessDeniedException("Không có quyền xoá review này");
        }

        if (review.getParentId() == null) {
            List<ProductReview> replies = reviewRepository.findByParentId(reviewId);
            reviewRepository.deleteAll(replies);
        }

        reviewRepository.delete(review);

        return toResponse(review);
    }

    @Override
    public void deleteReviewByUser(Long reviewId, Long authId) {
        ProductReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review không tồn tại."));

        // Đảm bảo đúng user đang xoá review của mình
        if (!review.getUserId().equals(authId)) {
            throw new AccessDeniedException("Bạn không có quyền xoá review này.");
        }

        // Nếu là review gốc: xoá luôn cả reply của seller (nếu có)
        if (review.getParentId() == null) {
            List<ProductReview> replies = reviewRepository.findByParentId(review.getId());
            for (ProductReview reply : replies) {
                if (isSellerOwnerOfProduct(reply.getUserId(), review.getProductAsin())) {
                    reviewRepository.delete(reply);
                }
            }
        }

        // Xoá review gốc
        reviewRepository.delete(review);
    }

    @Override
    public ReviewResponse updateReview(Long reviewId, ReviewRequest request) {
        ProductReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy bình luận với ID: " + reviewId));

        if (!review.getUserId().equals(request.getUserId())) {
            throw new AccessDeniedException("Bạn không có quyền chỉnh sửa bình luận này.");
        }

        if (request.getRating() == null || request.getRating() < 1 || request.getRating() > 5) {
            throw new IllegalArgumentException("Điểm đánh giá không hợp lệ (phải từ 1 đến 5).");
        }

        review.setComment(request.getComment());
        review.setRating(request.getRating());
        review.setUpdatedAt(LocalDateTime.now());

        ProductReview saved = reviewRepository.save(review);
        return toResponse(saved);
    }
    @Override
    public ReviewResponse updateSellerReply(Long replyId, SellerReplyRequest request, Long sellerId) {
        ProductReview reply = reviewRepository.findById(replyId)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy phản hồi từ cửa hàng."));
//        if (!Boolean.TRUE.equals(reply.getIsSellerReply())) {
//            throw new AccessDeniedException("Không phải phản hồi của seller.");
//        }
        if (!Objects.equals(reply.getUserId(), sellerId)) {
            throw new AccessDeniedException("Không phải phản hồi của bạn.");
        }

        if (!Objects.equals(reply.getProductAsin(), request.getProductAsin())) {
            throw new AccessDeniedException("Phản hồi không khớp sản phẩm.");
        }

        reply.setComment(request.getComment());
        reply.setUpdatedAt(LocalDateTime.now());

        ProductReview updated = reviewRepository.save(reply);

        return toResponse(updated);
    }
}
