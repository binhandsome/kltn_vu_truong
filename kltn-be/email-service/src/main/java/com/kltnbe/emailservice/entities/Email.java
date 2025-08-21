package com.kltnbe.emailservice.entities;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Email {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "email")
    private String email;
    @Column(name = "code")

    private String code;
    @Column(name = "expiration_time")

    private LocalDateTime expirationTime;

    public Email() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Email(String email, String code, LocalDateTime expirationTime) {
        this.email = email;
        this.code = code;
        this.expirationTime = expirationTime;
    }

    public LocalDateTime getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(LocalDateTime expirationTime) {
        this.expirationTime = expirationTime;
    }
}
