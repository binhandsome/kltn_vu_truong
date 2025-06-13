package com.kltnbe.userservice.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtUtil {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    private final SecretKeySpec signingKey;
    private final long accessTokenExpiration;
    private final long refreshTokenExpiration;

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long accessTokenExpiration,
            @Value("${jwt.refresh.expiration}") long refreshTokenExpiration
    ) {
        if (secret == null || secret.isEmpty()) {
            logger.error("JWT secret key is not configured. Please set 'jwt.secret' in application.yml");
            throw new IllegalStateException("JWT secret key is not configured. Please set 'jwt.secret' in application.yml");
        }

        this.signingKey = new SecretKeySpec(Base64.getDecoder().decode(secret), "HmacSHA512");
        this.accessTokenExpiration = accessTokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;

        logger.info("JwtUtil initialized successfully.");
    }

    public String generateAccessToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(signingKey) // Sửa lại, chỉ dùng signingKey, loại bỏ SignatureAlgorithm.HS512
                .compact();
    }

    public String generateRefreshToken() {
        String refreshToken = UUID.randomUUID().toString();
        return Jwts.builder()
                .setSubject(refreshToken)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .signWith(signingKey) // Sửa lại, chỉ dùng signingKey, loại bỏ SignatureAlgorithm.HS512
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser() // Thay parserBuilder() bằng parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser() // Thay parserBuilder() bằng parser()
                    .setSigningKey(signingKey)
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            logger.warn("Invalid token: {}", e.getMessage());
            return false;
        }
    }
}