package com.kltnbe.orderservice.dtos.req;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemRequest {
    private Long orderId;
    private Long productVariantId;
    private Long storeId;
    private int quantity;
    private Long sizeId;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
    private Long promotionId;
}