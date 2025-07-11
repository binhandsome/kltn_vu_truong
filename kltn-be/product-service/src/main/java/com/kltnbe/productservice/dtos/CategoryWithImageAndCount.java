package com.kltnbe.productservice.dtos;

public class CategoryWithImageAndCount {
    private String category;
    private int count;
    private String thumbnail;

    public CategoryWithImageAndCount(String category, int count, String thumbnail) {
        this.category = category;
        this.count = count;
        this.thumbnail = thumbnail;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
// getters, setters
}