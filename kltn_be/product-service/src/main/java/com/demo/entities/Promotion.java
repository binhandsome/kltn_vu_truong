// ===== File: entities/Promotion.java =====
package com.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "promotions")
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int promotionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private String promotionName;
    private Double discountValue;
    private boolean isActive;

    // Getters & Setters
}
