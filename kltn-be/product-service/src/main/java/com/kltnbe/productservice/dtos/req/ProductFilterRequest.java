package com.kltnbe.productservice.dtos.req;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductFilterRequest {
    private String salesRank;
    private String productType;
    private String tags;
    private int page = 0;
    private int size = 20;

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
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

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}