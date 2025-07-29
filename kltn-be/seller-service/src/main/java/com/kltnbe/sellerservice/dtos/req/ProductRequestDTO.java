package com.kltnbe.sellerservice.dtos.req;

import java.util.List;

public class ProductRequestDTO {
    private String accessToken;
    private String nameProduct;
    private String nameBrand;
    private Double price;
    private String productStatus;
    private String selectedCategory;
    private String selectedType;
    private String selectedGender;
    private Integer discountPercent;
    private List<String> selectedColors;
    private List<List<String>> categoryList;
    private String description;
    private String asin;
}
