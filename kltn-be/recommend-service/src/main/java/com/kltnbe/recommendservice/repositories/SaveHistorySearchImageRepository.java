package com.kltnbe.recommendservice.repositories;

import com.kltnbe.recommendservice.entities.SaveHistorySearchImage;
import com.kltnbe.recommendservice.entities.UserAsinHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaveHistorySearchImageRepository extends JpaRepository<SaveHistorySearchImage, Long> {
    List<SaveHistorySearchImage> findTop10ByAuthIdOrderByCreatedAtDesc(Long authId);
}
