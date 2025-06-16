package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.LoginRequest;
import com.kltnbe.userservice.dtos.req.PasswordChangeRequest;
import com.kltnbe.userservice.dtos.req.RegisterRequest;
import com.kltnbe.userservice.dtos.res.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    String register(RegisterRequest registerRequest);
    String verifyOtp(String username, String inputOtp);
    String registerSeller(RegisterRequest registerRequest);

    String changePassword(PasswordChangeRequest request);
    String sendOtpToResetPassword(String email);
    String resetPasswordByOtp(String email, String otp, String newPassword);
}
