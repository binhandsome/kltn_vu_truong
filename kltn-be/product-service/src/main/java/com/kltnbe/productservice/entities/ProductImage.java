package com.kltnbe.productservice.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_images")
@Data
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_asin", referencedColumnName = "asin", nullable = false)
    private Product product;

    @Column(name = "image_data", nullable = false, length = 255)
    private String imageData; // Tên file ảnh (VD: B00AQNOOIA_1.jpg)

    @Column(name = "is_main_image")
    private Integer isMainImage = 0; // default false

    @Column(name = "color_id")
    private Long colorId; // Có thể là null nếu không gắn với màu cụ thể
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}