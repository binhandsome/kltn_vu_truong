package com.kltnbe.cartservice.dtos.req;

import lombok.Data;

@Data
public class CartItemRequest {
    private String productAsin;
    private Long variantId;
    private int quantity;
}