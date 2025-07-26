package com.kltnbe.productservice.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "product_variants", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"product_id", "size_id", "color_id"})
})
@Data
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long variantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "size_id")
    private ProductSize size;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    private Color color;

    private BigDecimal price;

    private Integer quantityInStock;

    private Integer quantitySold;

    @Enumerated(EnumType.STRING)
    private VariantStatus status;

    public enum VariantStatus {
        IN_STOCK,
        OUT_OF_STOCK;

        @JsonCreator
        public static VariantStatus fromString(String key) {
            return key == null ? null : VariantStatus.valueOf(key.toUpperCase());
        }
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantityInStock() {
        return quantityInStock;
    }

    public void setQuantityInStock(Integer quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    public Integer getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(Integer quantitySold) {
        this.quantitySold = quantitySold;
    }

    public ProductSize getSize() {
        return size;
    }

    public void setSize(ProductSize size) {
        this.size = size;
    }

    public VariantStatus getStatus() {
        return status;
    }

    public void setStatus(VariantStatus status) {
        this.status = status;
    }

    public Long getVariantId() {
        return variantId;
    }

    public void setVariantId(Long variantId) {
        this.variantId = variantId;
    }
}
