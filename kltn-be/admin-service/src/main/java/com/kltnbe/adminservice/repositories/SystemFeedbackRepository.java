package com.kltnbe.adminservice.repositories;

import com.kltnbe.adminservice.entities.SystemFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SystemFeedbackRepository extends JpaRepository<SystemFeedback, Long> {
    List<SystemFeedback> findByRepliedFalse();
    List<SystemFeedback> findByUserId(Long userId);
}
