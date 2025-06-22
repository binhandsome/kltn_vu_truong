package com.kltnbe.emailservice.services;

import com.kltnbe.emailservice.repositories.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class CleanupService {
    @Autowired
    private EmailRepository emailRepository;

    @Scheduled(fixedRate = 60000) // Mỗi 60 giây
    @Transactional
    public void cleanExpiredOtps() {
        LocalDateTime expiredBefore = LocalDateTime.now().minusMinutes(5);
        emailRepository.deleteByExpirationTimeBefore(expiredBefore);
        System.out.println("Đã xóa các OTP hết hạn trước: " + expiredBefore);
    }
}
