package com.kltnbe.sellerservice.repositories;

import com.kltnbe.sellerservice.entities.ShopEdit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopEditRepository extends JpaRepository<ShopEdit,Long> {
    boolean existsByShopIdAndStatus(Long shopId, Long status);
}
