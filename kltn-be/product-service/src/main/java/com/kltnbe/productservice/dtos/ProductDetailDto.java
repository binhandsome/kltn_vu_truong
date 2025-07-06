package com.kltnbe.productservice.dtos;

import com.kltnbe.productservice.entities.Product;

import java.util.List;

public class ProductDetailDto {
    private Product product;
    private List<String> imageUrls;
    private List<String> sizes;
    private List<ColorDto> colors;
    private String categoryName;
    private String categoryDescription;
    private List<String> features;

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<ColorDto> getColors() {
        return colors;
    }

    public void setColors(List<ColorDto> colors) {
        this.colors = colors;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<String> getSizes() {
        return sizes;
    }

    public void setSizes(List<String> sizes) {
        this.sizes = sizes;
    }
}
