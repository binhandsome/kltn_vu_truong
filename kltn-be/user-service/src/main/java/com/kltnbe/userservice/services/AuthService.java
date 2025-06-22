package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.LoginRequest;
import com.kltnbe.userservice.dtos.req.RegisterRequest;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.entities.Auth;

public interface AuthService {
//    LoginResponse login(LoginRequest loginRequest);
    String register(RegisterRequest registerRequest);
    LoginResponse login(LoginRequest loginRequest);
    Auth getUserByUsername(String username);
//    String verifyOtp(String username, String inputOtp);
//    String registerSeller(RegisterRequest registerRequest);
//
//    String changePassword(PasswordChangeRequest request);
//    String sendOtpToResetPassword(String email);
//    String resetPasswordByOtp(String email, String otp, String newPassword);
}
