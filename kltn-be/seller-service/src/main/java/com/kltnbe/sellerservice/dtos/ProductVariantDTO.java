package com.kltnbe.sellerservice.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantDTO {
    private Long variantId;
    private Long productId;
    private String asin;
    private Long sizeId;
    private Long colorId;
    private BigDecimal price;
    private int quantityInStock;
    private int quantitySold;
    private String status;
}