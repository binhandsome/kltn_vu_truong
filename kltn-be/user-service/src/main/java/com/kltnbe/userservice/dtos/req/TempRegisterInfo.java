package com.kltnbe.userservice.dtos.req;

import com.kltnbe.userservice.enums.OtpPurpose;

public class TempRegisterInfo {
    private RegisterRequest registerRequest;
//    private String otpCode;
//    private long expiresAt;
//    private int attempts;
//    private OtpPurpose purpose; // xác định OTP cho đăng ký hay quên mật khẩu
    private String email;       // dùng cho reset password
    private String newPassword; // nếu cần lưu tạm mật khẩu mới

//    public int getAttempts() {
//        return attempts;
//    }
//
//    public void setAttempts(int attempts) {
//        this.attempts = attempts;
//    }
//
//    public long getExpiresAt() {
//        return expiresAt;
//    }
//
//    public void setExpiresAt(long expiresAt) {
//        this.expiresAt = expiresAt;
//    }
//
//    public String getOtpCode() {
//        return otpCode;
//    }
//
//    public void setOtpCode(String otpCode) {
//        this.otpCode = otpCode;
//    }

    public RegisterRequest getRegisterRequest() {
        return registerRequest;
    }

    public void setRegisterRequest(RegisterRequest registerRequest) {
        this.registerRequest = registerRequest;
    }
//    public OtpPurpose getPurpose() {
//        return purpose;
//    }
//
//    public void setPurpose(OtpPurpose purpose) {
//        this.purpose = purpose;
//    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
