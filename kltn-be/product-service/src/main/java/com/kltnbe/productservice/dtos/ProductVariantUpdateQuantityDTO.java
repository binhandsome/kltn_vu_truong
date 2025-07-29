package com.kltnbe.productservice.dtos;

import lombok.Data;

@Data
public class ProductVariantUpdateQuantityDTO {
    private Long variantId;
    private int quantity;
}