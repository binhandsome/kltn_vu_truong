package com.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreController {
    @GetMapping("/api/store")
    public String hello() {
        return "Hello from StoreService";
    }
}
