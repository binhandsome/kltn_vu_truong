package com.kltnbe.productservice.dtos.res;

import com.kltnbe.productservice.dtos.ColorDTO;
import com.kltnbe.productservice.dtos.req.ImageDTO;
import com.kltnbe.productservice.entities.ProductSize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private String asin;
    private String nameProduct;
    private String nameBrand;
    private Double price;
    private String productStatus;
    private String selectedCategory;
    private String selectedType;
    private String selectedGender;
    private Integer discountPercent;
    private List<ColorDTO> selectedColors;
    private List<List<String>> categoryList;
    private String description;
    private String thumbnail;
    private List<ImageDTO> listColorAndThumbnail;
    private List<ProductSize> size;
}
