package com.kltnbe.userservice.entities;

import com.kltnbe.userservice.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "auth")
@Data
public class Auth implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auth_id")
    private Long authId;

    @Column(name = "username", nullable = true, unique = true, length = 50)
    private String username;

    @Column(name = "password_hash", nullable = true, length = 255)
    private String passwordHash;

    @Column(name = "user_role", nullable = true, insertable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(name = "is_banned", nullable = true, insertable = false, updatable = false)
    private Boolean isBanned;

    @Column(name = "is_active", nullable = true, insertable = false, updatable = false)
    private Boolean isActive;

    @Column(name = "last_login", nullable = true, insertable = false, updatable = false)
    private Date lastLogin;

    @Column(name = "created_at", insertable = false, updatable = false)
    private Date createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
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