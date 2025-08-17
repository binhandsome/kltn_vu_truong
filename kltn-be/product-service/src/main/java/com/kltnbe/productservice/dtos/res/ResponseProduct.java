package com.kltnbe.productservice.dtos.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseProduct {
    private String asin;
    private Double percentDiscount;
    private Long productId;
    private BigDecimal productPrice;
    private String productStatus;
    private String productThumbnail;
    private String productTitle;
    private String productType;
    private String salesRank;
    private Integer soldCount;
    private Integer stockQuantity;
    private Long storeId;
    private String tags;
}
