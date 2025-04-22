package com.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CartController {
    @GetMapping("/api/cart")
    public String hello() {
        return "Hello from CartService";
    }
}
