package com.kltnbe.productservice.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_images")
@Data
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "product_asin", nullable = false, length = 50)
    private String productAsin;

    @Column(name = "image_data")
    private String imageData;

    @Column(name = "is_main_image")
    private Boolean isMainImage;

    @ManyToOne
    @JoinColumn(name = "product_asin", referencedColumnName = "asin", insertable = false, updatable = false)
    private Product product;
}