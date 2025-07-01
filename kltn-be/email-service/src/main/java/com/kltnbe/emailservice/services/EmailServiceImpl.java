package com.kltnbe.emailservice.services;

import com.kltnbe.emailservice.entities.Email;
import com.kltnbe.emailservice.repositories.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Transactional
    public void sendOtpEmail(String to, String otp) {
        // Xóa email cũ trong cùng giao dịch
        deleteAllEmail(to);
        // Tạo và lưu email mới
        LocalDateTime expTime = LocalDateTime.now().plusMinutes(5);
        Email email = new Email(to, otp, expTime);
        emailRepository.save(email);
        // Gửi email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Mã OTP xác minh tài khoản");
        message.setText("Mã OTP của bạn là: " + otp + "\nMã có hiệu lực: 5 Phút ");
        mailSender.send(message);

        System.out.println("Email sent to: " + to);
    }


    @Transactional
    public void deleteAllEmail(String email) {
        long countEmail = emailRepository.countByEmail(email);
        System.out.println("Số email tìm thấy: " + countEmail);
        if (countEmail > 0) {
            emailRepository.deleteByEmail(email);
        }
    }
}