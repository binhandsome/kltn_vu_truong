package com.kltnbe.sellerservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "shop")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id")
    private Long shopId;

    @Column(name = "auth_id")
    private Long authId;

    @Column(name = "name_shop")
    private String nameShop;

    @Column(name = "thumbnail_shop")
    private String thumbnailShop;

    @Column(name = "evaluate_shop")
    private Double evaluateShop = 0.0;

    @Column(name = "followers_shop")
    private Long followersShop = 0L;

    @Column(name = "description_shop")
    private String descriptionShop;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    @Column(name = "shop_status", length = 20)
    @Enumerated(EnumType.STRING)
    private Shop.ShopStatus shopStatus;
    @Column(name = "shop_address", length = 255)
    private String shopAddress;

    @Column(name = "shop_phone", length = 20)
    private String shopPhone;

    @Column(name = "shop_email", length = 255)
    private String shopEmail;
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    public enum ShopStatus {
        pending, active, suspended
    }

    public Long getAuthId() {
        return authId;
    }

    public void setAuthId(Long authId) {
        this.authId = authId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescriptionShop() {
        return descriptionShop;
    }

    public void setDescriptionShop(String descriptionShop) {
        this.descriptionShop = descriptionShop;
    }

    public Double getEvaluateShop() {
        return evaluateShop;
    }

    public void setEvaluateShop(Double evaluateShop) {
        this.evaluateShop = evaluateShop;
    }

    public Long getFollowersShop() {
        return followersShop;
    }

    public void setFollowersShop(Long followersShop) {
        this.followersShop = followersShop;
    }

    public String getNameShop() {
        return nameShop;
    }

    public void setNameShop(String nameShop) {
        this.nameShop = nameShop;
    }

    public String getShopAddress() {
        return shopAddress;
    }

    public void setShopAddress(String shopAddress) {
        this.shopAddress = shopAddress;
    }

    public String getShopEmail() {
        return shopEmail;
    }

    public void setShopEmail(String shopEmail) {
        this.shopEmail = shopEmail;
    }

    public Long getShopId() {
        return shopId;
    }

    public void setShopId(Long shopId) {
        this.shopId = shopId;
    }

    public String getShopPhone() {
        return shopPhone;
    }

    public void setShopPhone(String shopPhone) {
        this.shopPhone = shopPhone;
    }

    public ShopStatus getShopStatus() {
        return shopStatus;
    }

    public void setShopStatus(ShopStatus shopStatus) {
        this.shopStatus = shopStatus;
    }

    public String getThumbnailShop() {
        return thumbnailShop;
    }

    public void setThumbnailShop(String thumbnailShop) {
        this.thumbnailShop = thumbnailShop;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}