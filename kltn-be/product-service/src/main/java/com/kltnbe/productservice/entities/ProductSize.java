package com.kltnbe.productservice.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_sizes")
@Data
public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "size_id")
    private Long sizeId;

    @ManyToOne
    @JoinColumn(name = "product_asin", referencedColumnName = "asin")
    private Product product;

    @Column(name = "size_name", length = 50)
    private String sizeName;

    @Column(name = "size_sku")
    private String sizeSku;

    public Long getSizeId() {
        return sizeId;
    }

    public void setSizeId(Long sizeId) {
        this.sizeId = sizeId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }


    public String getSizeName() {
        return sizeName;
    }

    public void setSizeName(String sizeName) {
        this.sizeName = sizeName;
    }

    public String getSizeSku() {
        return sizeSku;
    }

    public void setSizeSku(String sizeSku) {
        this.sizeSku = sizeSku;
    }
}