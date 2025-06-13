package com.kltnbe.orderservice.controllers;

import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import com.kltnbe.orderservice.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        OrderResponse response = orderService.createOrder(orderRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUserId(@PathVariable Long userId) {
        List<OrderResponse> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/revenue/{authId}")
    public ResponseEntity<BigDecimal> getRevenueBySeller(@PathVariable Long authId) {
        BigDecimal revenue = orderService.getRevenueBySeller(authId);
        return ResponseEntity.ok(revenue);
    }
}