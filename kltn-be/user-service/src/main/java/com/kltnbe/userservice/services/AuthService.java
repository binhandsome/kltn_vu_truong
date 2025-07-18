package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.*;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.entities.Auth;

public interface AuthService {
//    LoginResponse login(LoginRequest loginRequest);
    String register(RegisterRequest registerRequest);
    LoginResponse login(LoginRequest loginRequest);
    Auth getUserByUsername(String username);
    String resetPassword(ResetPasswordRequest request);
    String changePassword(String email, ChangePasswordRequest request);
    boolean emailExists(String email);

//    String verifyOtp(String username, String inputOtp);
//    String registerSeller(RegisterRequest registerRequest);
//
//    String changePassword(PasswordChangeRequest request);
//    String sendOtpToResetPassword(String email);
//    String resetPasswordByOtp(String email, String otp, String newPassword);
}
