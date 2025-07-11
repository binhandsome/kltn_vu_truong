package com.kltnbe.productservice.dtos.res;

import com.kltnbe.productservice.dtos.CategoryWithImageAndCount;

import java.util.List;
import java.util.Map;

public class CategoryResponse {
    private Map<String, Integer> salesRankCount;
    private Map<String, Integer> productTypeCount;
    private Map<String, Integer> tags;

    private List<CategoryWithImageAndCount> salesRankCategories;
    private List<CategoryWithImageAndCount> productTypeCategories;

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

    public List<CategoryWithImageAndCount> getSalesRankCategories() {
        return salesRankCategories;
    }

    public void setSalesRankCategories(List<CategoryWithImageAndCount> salesRankCategories) {
        this.salesRankCategories = salesRankCategories;
    }

    public List<CategoryWithImageAndCount> getProductTypeCategories() {
        return productTypeCategories;
    }

    public void setProductTypeCategories(List<CategoryWithImageAndCount> productTypeCategories) {
        this.productTypeCategories = productTypeCategories;
    }
}
