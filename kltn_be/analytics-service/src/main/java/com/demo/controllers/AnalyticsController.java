package com.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalyticsController {
    @GetMapping("/api/analytics")
    public String hello() {
        return "Hello from AnalyticsService";
    }
}
