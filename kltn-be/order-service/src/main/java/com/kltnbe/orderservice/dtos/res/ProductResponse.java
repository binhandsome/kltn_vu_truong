package com.kltnbe.orderservice.dtos.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private Long productId;
    private String asin;
    private String nameProduct;
    private String nameBrand;
    private Double price;
    private String productStatus;
    private String selectedCategory;
    private String selectedType;
    private String selectedGender;
    private Integer discountPercent;

}
