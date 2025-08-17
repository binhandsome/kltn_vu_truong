package com.kltnbe.recommendservice.repositories;

import com.kltnbe.recommendservice.entities.UserAsinHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAsinHistoryRepository extends JpaRepository<UserAsinHistory, Long> {
    boolean existsByUserIdAndAsin(Long userId, String asin);
    List<UserAsinHistory> findTop10ByUserIdOrderByCreatedAtDesc(Long userId);

}
