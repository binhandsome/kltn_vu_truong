package com.kltn.searchservice.dtos;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.math.BigDecimal;

@Document(indexName = "products")
@Data
public class ProductDocument {

    @Id
    @Field(type = FieldType.Long)
    private Long productId;

    @Field(type = FieldType.Keyword)
    private String asin;

    @Field(type = FieldType.Text)
    private String productTitle;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Double)
    private BigDecimal productPrice;
    private String productThumbnail;
    private String salesRank;
    private String productType;
    private Double percentDiscount;
    private Integer stockQuantity;
    private String tags;
    private String productStatus; // ACTIVE, DELETED,...
    private Long storeId;
    private Long soldCount;

    public String getAsin() {
        return asin;
    }

    public void setAsin(String asin) {
        this.asin = asin;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(String productStatus) {
        this.productStatus = productStatus;
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

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getSalesRank() {
        return salesRank;
    }

    public void setSalesRank(String salesRank) {
        this.salesRank = salesRank;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
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

    public Long getSoldCount() {
        return soldCount;
    }

    public void setSoldCount(Long soldCount) {
        this.soldCount = soldCount;
    }
}