package com.kltnbe.reviewservice.entities;

import com.kltnbe.reviewservice.enums.ReviewStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "reviews")
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @Column(name = "product_asin", nullable = false, length = 50)
    private String productAsin;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "rating", nullable = false)
    private BigDecimal rating;

    @Column(name = "comment", length = 1000)
    private String comment;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified;

    @Column(name = "image", length = 255)
    private String image;

    @Column(name = "status", length = 20)
    @Enumerated(EnumType.STRING)
    private ReviewStatus status;

    @Column(name = "star_vote")
    private BigDecimal starVote;

    @Column(name = "seller_response", length = 1000)
    private String sellerResponse;
}