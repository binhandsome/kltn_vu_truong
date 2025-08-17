package com.kltnbe.productservice.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.kltnbe.productservice.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "asin"  // Dùng asin làm ID duy nhất trong JSON
)
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

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "sales_rank")
    private String salesRank;

    @Column(name = "product_type", length = 100)
    private String productType;

    @Column(name = "store_id")
    private Long storeId;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Category> category;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductSize> sizes;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<ProductImage> images;
    @Column(name = "percent_discount")
    private Double percentDiscount;

    @Column(name = "color_asin", columnDefinition = "TEXT")
    private String colorAsin;

    @Column(name = "tags")
    private String tags;

    @Column(name = "store_thum_title", columnDefinition = "JSON")
    private String storeThumTitle;

    private Integer quantitySold;
}