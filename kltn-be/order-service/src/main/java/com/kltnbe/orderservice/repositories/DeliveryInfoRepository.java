package com.kltnbe.orderservice.repositories;

import com.kltnbe.orderservice.entities.DeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Long> {
    DeliveryInfo findByOrderId(Long orderId);
    List<DeliveryInfo> findByOrderIdIn(List<Long> orderIds);

}
