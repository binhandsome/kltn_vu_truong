package com.kltnbe.adminservice.repositories;

import com.kltnbe.adminservice.entities.SaveHistoryActionRecommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AdminSaveHistoryActionRecommendRepository extends JpaRepository<SaveHistoryActionRecommend, Long> {
    SaveHistoryActionRecommend findByFileSave(String fileSave);
}
