package com.kltnbe.productservice.entities;

import com.kltnbe.productservice.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "asin", nullable = false, unique = true, length = 50)
    private String asin;

    @Column(name = "product_title", nullable = false, length = 255)
    private String productTitle;

    @Column(name = "product_price")
    private BigDecimal productPrice;

    @Column(name = "average_rating")
    private BigDecimal averageRating;

    @Column(name = "number_of_ratings")
    private Integer numberOfRatings;

    @Column(name = "product_thumbnail", length = 255)
    private String productThumbnail;

    @Column(name = "brand_name", length = 100)
    private String brandName;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "product_status", length = 20)
    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;
}