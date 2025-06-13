package com.kltnbe.userservice.controllers;

import com.kltnbe.userservice.dtos.req.LoginRequest;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.dtos.req.RegisterRequest;
import com.kltnbe.userservice.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/register/seller")
    public ResponseEntity<String> registerSeller(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerSeller(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}