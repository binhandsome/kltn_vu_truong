package com.kltnbe.sellerservice.repositories;

import com.kltnbe.sellerservice.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByAuthId(Long authId);
}