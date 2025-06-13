package com.kltnbe.cartservice.dtos.res;

import com.kltnbe.cartservice.dtos.CartItemDTO;
import lombok.Data;


import java.util.List;

@Data
public class CartResponse {
    private Long cartId;
    private Long userId;
    private List<CartItemDTO> items;


}