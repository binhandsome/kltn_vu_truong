package com.kltnbe.sellerservice.repositories;

import com.kltnbe.sellerservice.entities.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    boolean existsByAuthId(Long authId);
    Optional<Shop> findByAuthId(Long authId);

}
