package com.kltnbe.recommendservice.repositories;

import com.kltnbe.recommendservice.entities.AsinRecommendation;
import com.kltnbe.recommendservice.entities.SaveHistoryEvaluate;
import com.kltnbe.recommendservice.entities.SaveHistorySearchImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaveHistoryUserEvaluateRepository extends JpaRepository<SaveHistoryEvaluate,Long> {
    List<SaveHistoryEvaluate> findTop5ByAuthIdOrderByCreatedAtDesc(Long authId);
}
