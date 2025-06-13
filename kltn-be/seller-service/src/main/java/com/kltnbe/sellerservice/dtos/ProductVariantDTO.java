package com.kltnbe.sellerservice.dtos;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductVariantDTO {
    private Long variantId;
    private String productAsin;
    private Long storeId;
    private BigDecimal variantPrice;
    private String variantColor;
    private String variantSku;
    private String variantThumbnail;
}