package com.kltnbe.orderservice.controllers;

import com.kltnbe.orderservice.entities.ShippingMethod;
import com.kltnbe.orderservice.services.ShippingMethodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// ShippingMethodController.java
@RestController
@RequestMapping("/api/shippingMethods")
public class ShippingMethodController {
    private final ShippingMethodService shippingMethodService;

    public ShippingMethodController(ShippingMethodService service) {
        this.shippingMethodService = service;
    }

    @GetMapping
    public ResponseEntity<List<ShippingMethod>> getAllShippingMethods() {
        return ResponseEntity.ok(shippingMethodService.getAllShippingMethods());
    }
}
