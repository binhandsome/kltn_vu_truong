package com.kltnbe.orderservice.controllers;

import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import com.kltnbe.orderservice.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/placeOrder")
    ResponseEntity<?> savePlaceOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.saveOrder(orderRequest);
    }
    @PostMapping("/placeGuestOrder")
    public ResponseEntity<?> placeOrderForGuest(@RequestBody OrderRequest orderRequest) {
        return orderService.placeGuestOrder(orderRequest);
    }
    @GetMapping("/user")
    public Page<OrderResponse> getOrdersByAccessToken(
            @RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return orderService.getOrdersByAccessToken(token, page, size);
    }

}