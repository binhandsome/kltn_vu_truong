package com.kltnbe.reviewservice.dtos;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class ReviewDTO {
    private Long reviewId;
    private Long userId;
    private String productAsin;
    private BigDecimal rating;
    private String comment;
    private Date createdAt;
    private Date updatedAt;
    private Boolean isVerified;
    private String image;
    private String status;
    private BigDecimal starVote;
    private String sellerResponse;
}