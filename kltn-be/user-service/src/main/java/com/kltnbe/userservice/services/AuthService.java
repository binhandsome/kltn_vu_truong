package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.*;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.entities.Auth;
import org.springframework.http.ResponseEntity;

public interface AuthService {
//    LoginResponse login(LoginRequest loginRequest);
    String register(RegisterRequest registerRequest);
    LoginResponse login(LoginRequest loginRequest);
    Auth getUserByUsername(String username);
    String resetPassword(ResetPasswordRequest request);
    String changePassword(String email, ChangePasswordRequest request);
    boolean emailExists(String email);
    Long findIdByUsername(String username);
    Long findIdByEmail(String email);
    boolean usernameExists(String username);
    String findRoleUserByEmail(String email);
    ResponseEntity<?> checkLoginSeller(LoginRequest request);
    ResponseEntity<?> verifyLoginSeller(RequestInfomation requestInfomation);
    ResponseEntity<?> getUserWithAccessToken(String accessToken);
    Long findIdAuthByAccessToken(String accessToken);
    ResponseEntity<?> loginAdmin(LoginRequest request);
    ResponseEntity<?> forgotPasswordAdmin(String email);
    ResponseEntity<?> resetPasswordAdmin(ResetPasswordRequest request);
    ResponseEntity<?> changePasswordAdmin(String email, ChangePasswordRequest request);
    String changeUserRole(Long userId, String role);
    String resetPasswordByAdmin(Long userId);
    void createUserWithoutOtp(RegisterRequest request);

//    String verifyOtp(String username, String inputOtp);
//    String registerSeller(RegisterRequest registerRequest);
//
//    String changePassword(PasswordChangeRequest request);
//    String sendOtpToResetPassword(String email);
//    String resetPasswordByOtp(String email, String otp, String newPassword);
}
