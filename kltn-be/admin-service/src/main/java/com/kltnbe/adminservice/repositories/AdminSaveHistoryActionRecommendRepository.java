package com.kltnbe.adminservice.repositories;

import com.kltnbe.adminservice.entities.SaveHistoryActionRecommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AdminSaveHistoryActionRecommendRepository extends JpaRepository<SaveHistoryActionRecommend, Long> {
    SaveHistoryActionRecommend findByFileSave(String fileSave);
    List<SaveHistoryActionRecommend> findAllByOrderByCreatedAtDesc();
}
