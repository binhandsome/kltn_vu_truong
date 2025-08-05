package com.kltnbe.productservice.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long productId;
    private String asin;
    private String productTitle;
    private BigDecimal productPrice;
    private String productThumbnail;
    private String salesRank;
    private String productType;
    private Double percentDiscount;
    private Integer stockQuantity;
    private String tags;
    private String productStatus; // ACTIVE, DELETED,...
    private Long storeId;

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(String productStatus) {
        this.productStatus = productStatus;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getProductThumbnail() {
        return productThumbnail;
    }

    public void setProductThumbnail(String productThumbnail) {
        this.productThumbnail = productThumbnail;
    }

    public String getSalesRank() {
        return salesRank;
    }

    public void setSalesRank(String salesRank) {
        this.salesRank = salesRank;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public Double getPercentDiscount() {
        return percentDiscount;
    }

    public void setPercentDiscount(Double percentDiscount) {
        this.percentDiscount = percentDiscount;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getAsin() {
        return asin;
    }

    public void setAsin(String asin) {
        this.asin = asin;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStock_quantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}
