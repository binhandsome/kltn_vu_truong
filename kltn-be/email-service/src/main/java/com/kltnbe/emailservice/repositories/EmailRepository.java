package com.kltnbe.emailservice.repositories;


import com.kltnbe.emailservice.entities.Email;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface EmailRepository extends JpaRepository<Email, Long> {
    int countByEmail(String email);
    void deleteByEmail(String email);
    void deleteByExpirationTimeBefore(LocalDateTime time);
    Email findEmailByEmail(String email);
}
