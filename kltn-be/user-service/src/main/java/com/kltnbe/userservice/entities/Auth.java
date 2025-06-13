package com.kltnbe.userservice.entities;

import com.kltnbe.userservice.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "auth")
@Data
public class Auth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_id")
    private Long authId;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "user_role", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(name = "is_banned", nullable = false)
    private Boolean isBanned;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "last_login", nullable = false)
    private Date lastLogin;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    @Column(name = "last_login_ip", length = 45)
    private String lastLoginIp;

    @Column(name = "last_login_country", length = 100)
    private String lastLoginCountry;

    @Column(name = "email", unique = true, length = 100)
    private String email;

    @Column(name = "refresh_token", length = 255)
    private String refreshToken;
}