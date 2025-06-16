package com.kltnbe.userservice.controllers;

import com.kltnbe.userservice.dtos.req.LoginRequest;
import com.kltnbe.userservice.dtos.req.PasswordChangeRequest;
import com.kltnbe.userservice.dtos.req.RegisterRequest;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String username, @RequestParam String otp) {
        return authService.verifyOtp(username, otp);
    }

    @PostMapping("/register-seller")
    public String registerSeller(@RequestBody RegisterRequest request) {
        return authService.registerSeller(request);
    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody PasswordChangeRequest request) {
        return authService.changePassword(request);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) {
        return authService.sendOtpToResetPassword(email);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String email,
                                @RequestParam String otp,
                                @RequestParam String newPassword) {
        return authService.resetPasswordByOtp(email, otp, newPassword);
    }
}
