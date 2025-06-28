package com.kltnbe.productservice.dtos.res;

import com.kltnbe.productservice.entities.Product;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductFilterResponse {
    private Page<Product> products;
    private List<String> salesRanks;
    private List<String> productTypes;
    private List<CategoryWithImage> salesRankCategories;
    private List<CategoryWithImage> productTypeCategories;
    // getter + setter

    public Page<Product> getProducts() {
        return products;
    }

    public List<CategoryWithImage> getSalesRankCategories() {
        return salesRankCategories;
    }

    public void setSalesRankCategories(List<CategoryWithImage> salesRankCategories) {
        this.salesRankCategories = salesRankCategories;
    }

    public List<CategoryWithImage> getProductTypeCategories() {
        return productTypeCategories;
    }

    public void setProductTypeCategories(List<CategoryWithImage> productTypeCategories) {
        this.productTypeCategories = productTypeCategories;
    }

    public void setProducts(Page<Product> products) {
        this.products = products;
    }

    public List<String> getSalesRanks() {
        return salesRanks;
    }

    public void setSalesRanks(List<String> salesRanks) {
        this.salesRanks = salesRanks;
    }

    public List<String> getProductTypes() {
        return productTypes;
    }

    public void setProductTypes(List<String> productTypes) {
        this.productTypes = productTypes;
    }
}