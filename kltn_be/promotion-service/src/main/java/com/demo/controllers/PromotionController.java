package com.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PromotionController {
    @GetMapping("/api/promotion")
    public String hello() {
        return "Hello from PromotionService";
    }
}
