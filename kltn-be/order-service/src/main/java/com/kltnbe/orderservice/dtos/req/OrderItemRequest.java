package com.kltnbe.orderservice.dtos.req;

import com.kltnbe.orderservice.entities.Order;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemRequest {
    private Long productId;
    private int quantity;
    private BigDecimal unitPrice;
    private String color;
    private String size;
}