package com.kltnbe.emailservice.services;

import java.time.LocalDateTime;

public interface EmailService {
    public void sendOtpEmail(String to, String otp);

}