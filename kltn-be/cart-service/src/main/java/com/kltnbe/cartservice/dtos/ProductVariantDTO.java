package com.kltnbe.cartservice.dtos;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductVariantDTO {
    private Long variantId;
    private String productAsin;
    private BigDecimal variantPrice;
    private Integer stockQuantity;
}