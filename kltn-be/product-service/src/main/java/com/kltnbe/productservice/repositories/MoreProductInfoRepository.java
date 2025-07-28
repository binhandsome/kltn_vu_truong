package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.MoreProductInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoreProductInfoRepository extends JpaRepository<MoreProductInfo,Long> {
    MoreProductInfo findByMoreProductId(Long id);
}
