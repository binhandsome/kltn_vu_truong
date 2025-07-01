package com.kltnbe.emailservice.controllers;

import com.kltnbe.emailservice.dtos.req.ForgotPasswordOtpRequest;
import com.kltnbe.emailservice.dtos.req.RequestInfomation;
import com.kltnbe.emailservice.entities.Email;
import com.kltnbe.emailservice.helpers.RandomNumberHelper;
import com.kltnbe.emailservice.repositories.EmailRepository;
import com.kltnbe.emailservice.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @Autowired
    private RandomNumberHelper randomNumberHelper;
    @Autowired
    private EmailRepository emailRepository;

    @PostMapping("/sendEmailRegister")
    public ResponseEntity<String> sendEmailRegister(@RequestBody RequestInfomation requestInfomation) {
        try {
            String email = requestInfomation.getEmail();
            String otp = randomNumberHelper.generate6DigitString();
            emailService.sendOtpEmail(email, otp);
            return ResponseEntity.ok("Email sent successfully with OTP: " + otp);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        }
    }
    @PostMapping("/checkOTP")
    public ResponseEntity<String> checkOTP(@RequestBody RequestInfomation requestInfomation) {
        try {
            String email = requestInfomation.getEmail();
            String otp = requestInfomation.getOtp();

            Email emailEntity = emailRepository.findEmailByEmail(email);
            if (emailEntity == null) {
                return ResponseEntity.status(404).body("Không tìm thấy email");
            }

            if (emailEntity.getCode().equalsIgnoreCase(otp)) {
                return ResponseEntity.ok("OTP đúng");
            } else {
                return ResponseEntity.status(400).body("OTP sai");
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Thất bại: " + e.getMessage());
        }
    }
    @PostMapping("/sendOtpResetPassword")
    public ResponseEntity<String> sendOtpResetPassword(@RequestBody ForgotPasswordOtpRequest request) {
        try {
            String otp = randomNumberHelper.generate6DigitString();
            emailService.sendOtpEmail(request.getEmail(), otp);
            return ResponseEntity.ok("OTP đặt lại mật khẩu đã được gửi");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi gửi OTP: " + e.getMessage());
        }
    }




}