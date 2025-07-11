package com.kltnbe.productservice.dtos;

import com.kltnbe.productservice.entities.Product;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
public class WishlistDTO {
    private String asin;
    private String title;
    private BigDecimal originalPrice;
    private BigDecimal discountedPrice;
    private Double percentDiscount;
    private String image;

    public WishlistDTO(String asin, String title, BigDecimal originalPrice, BigDecimal discountedPrice, Double percentDiscount,  String image) {
        this.asin = asin;
        this.discountedPrice = discountedPrice;
        this.image = image;
        this.originalPrice = originalPrice;
        this.percentDiscount = percentDiscount;
        this.title = title;
    }

    public String getAsin() {
        return asin;
    }

    public void setAsin(String asin) {
        this.asin = asin;
    }

    public BigDecimal getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(BigDecimal discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Double getPercentDiscount() {
        return percentDiscount;
    }

    public void setPercentDiscount(Double percentDiscount) {
        this.percentDiscount = percentDiscount;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
