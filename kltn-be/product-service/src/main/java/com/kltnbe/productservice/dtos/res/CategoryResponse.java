package com.kltnbe.productservice.dtos.res;

import java.util.Map;

public class CategoryResponse {
    private Map<String, Integer> salesRankCount;
    private Map<String, Integer> productTypeCount;
    private Map<String, Integer> tags;

    public Map<String, Integer> getSalesRankCount() {
        return salesRankCount;
    }

    public void setSalesRankCount(Map<String, Integer> salesRankCount) {
        this.salesRankCount = salesRankCount;
    }

    public Map<String, Integer> getProductTypeCount() {
        return productTypeCount;
    }

    public void setProductTypeCount(Map<String, Integer> productTypeCount) {
        this.productTypeCount = productTypeCount;
    }

    public Map<String, Integer> getTags() {
        return tags;
    }

    public void setTags(Map<String, Integer> tags) {
        this.tags = tags;
    }
}
