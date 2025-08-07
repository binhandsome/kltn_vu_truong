package com.kltnbe.sellerservice.dtos.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemResponse {

    private String asin;
    private String productTitle;
    private String productThumbnail;
    private BigDecimal productPrice;
    private BigDecimal unitPrice;
    private int quantity;
    private String color;
    private String size;
    private Double percentDiscount;
    private String brandName;
    private int isEvaluate;
    private Long orderItemId;

    public OrderItemResponse(String asin, String brandName, String color, Double percentDiscount, BigDecimal productPrice, String productThumbnail, String productTitle, int quantity, String size, BigDecimal unitPrice) {
        this.asin = asin;
        this.brandName = brandName;
        this.color = color;
        this.percentDiscount = percentDiscount;
        this.productPrice = productPrice;
        this.productThumbnail = productThumbnail;
        this.productTitle = productTitle;
        this.quantity = quantity;
        this.size = size;
        this.unitPrice = unitPrice;
    }

    public String getAsin() {
        return asin;
    }

    public void setAsin(String asin) {
        this.asin = asin;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getPercentDiscount() {
        return percentDiscount;
    }

    public void setPercentDiscount(Double percentDiscount) {
        this.percentDiscount = percentDiscount;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductThumbnail() {
        return productThumbnail;
    }

    public void setProductThumbnail(String productThumbnail) {
        this.productThumbnail = productThumbnail;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
}
