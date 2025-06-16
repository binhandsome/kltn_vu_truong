package com.kltnbe.productservice.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "categories")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "product_asin", nullable = false, length = 50)
    private String productAsin;

    @Column(name = "category_name", length = 100)
    private String categoryName;

    @Column(name = "category_description", length = 255)
    private String categoryDescription;

    @Column(name = "category_features", columnDefinition = "LONGTEXT")
    private String categoryFeatures;

    @Column(name = "store_id")
    private Long storeId;

    @ManyToOne
    @JoinColumn(name = "product_asin", referencedColumnName = "asin", insertable = false, updatable = false)
    private Product product;
}