package com.kltnbe.sellerservice.dtos;

import lombok.Data;

@Data
public class ProductSizeDTO {
    private Long sizeId;
    private String sizeName;
    private String sizeSku;
}