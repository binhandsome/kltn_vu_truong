package com.kltnbe.sellerservice.dtos.req;

public class ReviewRequest {
    private String productAsin;
    private Integer rating;
    private String comment;
    private Long userId; // 👈 thêm dòng này
    private Long parentId;
    private Boolean isSellerReply;
    public Boolean getIsSellerReply() {
        return isSellerReply;
    }
    public void setIsSellerReply(Boolean isSellerReply) {
        this.isSellerReply = isSellerReply;
    }

    // Getter Setter cho userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getProductAsin() {
        return productAsin;
    }

    public void setProductAsin(String productAsin) {
        this.productAsin = productAsin;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
}