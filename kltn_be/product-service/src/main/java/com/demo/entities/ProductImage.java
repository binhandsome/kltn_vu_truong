// ===== File: entities/ProductImage.java =====
package com.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "product_images")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imageId;

    private String productAsin;

    @Column(columnDefinition = "json")
    private String imageData;

    private boolean isMainImage;

    // Getters & Setters
}
