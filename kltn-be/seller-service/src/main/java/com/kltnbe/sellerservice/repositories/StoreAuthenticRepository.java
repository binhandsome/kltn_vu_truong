package com.kltnbe.sellerservice.repositories;

import com.kltnbe.sellerservice.entities.StoreAuthentic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreAuthenticRepository extends JpaRepository<StoreAuthentic, Long> {
    Optional<StoreAuthentic> findByAuthId(Long authId);
}
