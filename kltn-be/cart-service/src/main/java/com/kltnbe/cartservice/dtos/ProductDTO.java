package com.kltnbe.cartservice.dtos;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductDTO {
    private String asin;
    private BigDecimal productPrice;
    private Integer stockQuantity;
}