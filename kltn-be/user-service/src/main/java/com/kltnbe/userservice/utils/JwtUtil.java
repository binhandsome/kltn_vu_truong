package com.kltnbe.userservice.utils;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh.expiration}")
    private long refreshTokenExpiration;

    private static final long CLOCK_SKEW_SECONDS = 5; // Cho phép lệch thời gian 5 giây

    // Tạo access token với username và role (chỉ một role: USER, SELLER, hoặc ADMIN)
    public String generateAccessToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", "ROLE_" + role) // Thêm tiền tố ROLE_ khi tạo token
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    // Tạo refresh token
    public String generateRefreshToken() {
        return UUID.randomUUID().toString();
    }

    // Lấy username từ token
    public String getUsernameFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secret)
                    .setAllowedClockSkewSeconds(CLOCK_SKEW_SECONDS)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            return e.getClaims().getSubject(); // Vẫn lấy username khi token hết hạn
        }
    }

    // Lấy role từ token
    public String getRoleFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secret)
                    .setAllowedClockSkewSeconds(CLOCK_SKEW_SECONDS)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("role", String.class);
        } catch (ExpiredJwtException e) {
            return e.getClaims().get("role", String.class);
        }
    }

    // Xác thực token
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secret)
                    .setAllowedClockSkewSeconds(CLOCK_SKEW_SECONDS)
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token đã hết hạn", e);
        } catch (Exception e) {
            throw new RuntimeException("Token không hợp lệ", e);
        }
    }
}