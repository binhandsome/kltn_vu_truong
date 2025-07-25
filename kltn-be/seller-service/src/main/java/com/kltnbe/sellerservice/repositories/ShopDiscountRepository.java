package com.kltnbe.sellerservice.repositories;

import com.kltnbe.sellerservice.entities.ShopDiscount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShopDiscountRepository extends JpaRepository<ShopDiscount, Long> {
    List<ShopDiscount> findByShopId(Long shopId);
    void deleteByShopId(Long shopId);
    ShopDiscount findByDiscountShopIdAndShopId(Long idShopDiscount, Long idShop);
}
