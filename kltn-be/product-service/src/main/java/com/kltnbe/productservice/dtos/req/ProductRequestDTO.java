package com.kltnbe.productservice.dtos.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {
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
    private Long shopId;
}