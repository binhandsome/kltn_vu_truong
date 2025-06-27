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

    @Column(name = "product_asin", nullable = false, length = 50)
    private String productAsin;

    @Column(name = "variant_price")
    private BigDecimal variantPrice;

    @Column(name = "variant_color", length = 50)
    private String variantColor;

    @Column(name = "variant_sku", nullable = false, unique = true, length = 100)
    private String variantSku;

    @Column(name = "variant_thumbnail", length = 255)
    private String variantThumbnail;

    @Column(name = "store_id")
    private Long storeId;

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }

    public String getProductAsin() {
        return productAsin;
    }

    public void setProductAsin(String productAsin) {
        this.productAsin = productAsin;
    }

    public BigDecimal getVariantPrice() {
        return variantPrice;
    }

    public void setVariantPrice(BigDecimal variantPrice) {
        this.variantPrice = variantPrice;
    }

    public String getVariantColor() {
        return variantColor;
    }

    public void setVariantColor(String variantColor) {
        this.variantColor = variantColor;
    }

    public String getVariantSku() {
        return variantSku;
    }

    public void setVariantSku(String variantSku) {
        this.variantSku = variantSku;
    }

    public String getVariantThumbnail() {
        return variantThumbnail;
    }

    public void setVariantThumbnail(String variantThumbnail) {
        this.variantThumbnail = variantThumbnail;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }
}