package com.kltnbe.sellerservice.repositories;

import com.kltnbe.sellerservice.entities.ShopFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ShopFollowRepository extends JpaRepository<ShopFollow, Long> {
    boolean existsByUserIdAndShopId(Long userId, Long shopId);
    long countByShopId(Long shopId);

    @Transactional
    void deleteByUserIdAndShopId(Long userId, Long shopId);
}
