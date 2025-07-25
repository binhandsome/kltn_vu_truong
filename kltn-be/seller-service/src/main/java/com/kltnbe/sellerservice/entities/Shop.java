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
}