package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;

public interface OrderService {
    ResponseEntity<?> saveOrder(OrderRequest orderRequest);
    ResponseEntity<?> placeGuestOrder(OrderRequest orderRequest);
    Page<OrderResponse> getOrdersByAccessToken(String accessToken, int page, int size);
}