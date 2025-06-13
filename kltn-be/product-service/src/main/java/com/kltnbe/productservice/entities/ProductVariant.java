package com.kltnbe.productservice.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "product_variants")
@Data
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "variant_id")
    private Long variantId;

    @Column(name = "product_asin", nullable = false, length = 10)
    private String productAsin;

    @Column(name = "store_id", nullable = false)
    private Long storeId;

    @Column(name = "variant_price")
    private BigDecimal variantPrice;

    @Column(name = "variant_color", length = 50)
    private String variantColor;

    @Column(name = "variant_sku", length = 50)
    private String variantSku;

    @Column(name = "variant_thumbnail", length = 255)
    private String variantThumbnail;

    @ManyToOne
    @JoinColumn(name = "product_asin", referencedColumnName = "asin", insertable = false, updatable = false)
    private Product product;
}