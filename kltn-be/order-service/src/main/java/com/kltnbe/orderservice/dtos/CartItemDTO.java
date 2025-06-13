package com.kltnbe.orderservice.dtos;

import lombok.Data;
import java.math.BigDecimal;

    @Data
    public class CartItemDTO {
        private Long cartItemId;
        private String productAsin;
        private Long variantId;
        private int quantity;
        private BigDecimal unitPrice;
    }