package com.kltnbe.orderservice.dtos.res;

import com.kltnbe.orderservice.dtos.CartItemDTO;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CartResponse {
    private String cartId; // đổi từ Long sang String
    private Long userId;
    private List<CartItemDTO> items;


}