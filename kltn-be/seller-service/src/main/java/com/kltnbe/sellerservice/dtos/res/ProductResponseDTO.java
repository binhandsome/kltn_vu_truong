package com.kltnbe.sellerservice.dtos.res;

import com.kltnbe.sellerservice.dtos.ColorDTO;
import com.kltnbe.sellerservice.dtos.ProductSizeDTO;
import com.kltnbe.sellerservice.dtos.req.ImageDTO;
import lombok.Data;

import java.util.List;

@Data
public class ProductResponseDTO {
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
    private List<ColorDTO> selectedColors;
    private List<List<String>> categoryList;
    private String description;
    private String thumbnail;
    private List<ImageDTO> listColorAndThumbnail;
    private List<ProductSizeDTO> size;
}