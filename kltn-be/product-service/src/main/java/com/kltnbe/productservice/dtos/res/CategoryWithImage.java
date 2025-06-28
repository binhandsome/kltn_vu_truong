package com.kltnbe.productservice.dtos.res;

public class CategoryWithImage {
    private String category;
    private String thumbnail;

    public CategoryWithImage(String category, String thumbnail) {
        this.category = category;
        this.thumbnail = thumbnail;
    }

    // constructor, getter, setter

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    @Override
    public String toString() {
        return "CategoryWithImage{" +
                "category='" + category + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                '}';
    }
}