package com.kltnbe.sellerservice.repositories;

import com.kltnbe.sellerservice.entities.UserUseDiscount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserUseDiscountRepository extends JpaRepository<UserUseDiscount, Long> {
    boolean existsByUserIdAndDiscountShopId(Long userId, Long discountShopId);

}
