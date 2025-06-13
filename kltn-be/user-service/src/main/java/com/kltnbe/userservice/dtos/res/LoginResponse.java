package com.kltnbe.userservice.dtos.res;

public class LoginResponse {
    private String accessToken;
    private String refreshToken;

    // Getters và Setters
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}