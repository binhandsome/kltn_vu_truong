package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.res.OrderResponse;

import java.math.BigDecimal;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest orderRequest);
    List<OrderResponse> getOrdersByUserId(Long userId);
    BigDecimal getRevenueBySeller(Long authId);
}