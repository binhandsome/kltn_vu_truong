package com.kltnbe.emailservice.dtos.res;

public class ResponseEmail {
    private String otpCode;
    private String message;

    public ResponseEmail(String otpCode, String message) {
        this.otpCode = otpCode;
        this.message = message;
    }

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
