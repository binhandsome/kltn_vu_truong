package com.kltnbe.security.utils;

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

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.refresh.expiration}")
    private long refreshTokenExpiration;

    private static final long CLOCK_SKEW_SECONDS = 5; // Cho phép lệch thời gian 5 giây

    // Tạo access token với username và role (chỉ một role: USER, SELLER, hoặc ADMIN)
    public String generateAccessToken(String username, Long authId, String role) {
        return Jwts.builder()
                .setIssuer(issuer)
                .setSubject(username) // ✅ giữ username là subject
                .claim("auth_id", authId) // ✅ thêm auth_id làm claim riêng
                .claim("role", "ROLE_" + role) // ROLE_SELLER, ROLE_ADMIN
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
    // Tạo refresh token
    public String generateRefreshToken() {
        return UUID.randomUUID().toString();
    }

    public Long getAuthIdFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .get("auth_id", Long.class);
    }


    // Lấy username từ token
    public String getUsernameFromToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).setAllowedClockSkewSeconds(CLOCK_SKEW_SECONDS).parseClaimsJws(token);
            return Jwts.parser()
                    .setSigningKey(secret)
                    .setAllowedClockSkewSeconds(CLOCK_SKEW_SECONDS)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            throw new SecurityException("Token has expired", e); // Ném ngoại lệ thay vì trả về username
        } catch (Exception e) {
            throw new SecurityException("Invalid token", e);
        }
    }

    public String getRoleFromToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).setAllowedClockSkewSeconds(CLOCK_SKEW_SECONDS).parseClaimsJws(token);
            return Jwts.parser()
                    .setSigningKey(secret)
                    .setAllowedClockSkewSeconds(CLOCK_SKEW_SECONDS)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("role", String.class);
        } catch (ExpiredJwtException e) {
            throw new SecurityException("Token has expired", e);
        } catch (Exception e) {
            throw new SecurityException("Invalid token", e);
        }
    }
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secret)
                    .setAllowedClockSkewSeconds(CLOCK_SKEW_SECONDS)
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            return false; // Token hết hạn
        } catch (Exception e) {
            return false; // Token không hợp lệ
        }
    }

}