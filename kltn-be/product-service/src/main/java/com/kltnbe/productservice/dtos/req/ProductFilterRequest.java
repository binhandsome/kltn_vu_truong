package com.kltnbe.productservice.dtos.req;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductFilterRequest {
    private Long categoryId;
    private String brandName;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Float minRating;
    private String keyword;
    private int page = 0;
    private int size = 10;
}