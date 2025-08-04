package com.kltnbe.adminservice.dtos.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemSummary {
    private String asin;
    private String titleProduct;
    private int quantity;
    private BigDecimal unitPrice;
    private String color;
    private String size;
}