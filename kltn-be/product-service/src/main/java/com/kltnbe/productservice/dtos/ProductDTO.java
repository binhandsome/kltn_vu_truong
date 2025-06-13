package com.kltnbe.productservice.dtos;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductDTO {
    private Long productId;
    private String asin;
    private String productTitle;
    private BigDecimal productPrice;
    private BigDecimal averageRating;
    private Integer numberOfRatings;
    private String productThumbnail;
    private String brandName;
    private Integer stockQuantity;
    private String productStatus;
}