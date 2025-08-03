package com.kltnbe.orderservice.repositories;

import com.kltnbe.orderservice.entities.DeliveryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Long> {
    DeliveryInfo findByOrderId(Long orderId);

    @Query("SELECT di FROM DeliveryInfo di WHERE di.orderId IN :orderIds AND EXISTS (SELECT o FROM Order o WHERE o.orderId = di.orderId AND o.storeId = :storeId)")
    List<DeliveryInfo> findByOrderIdIn(@Param("storeId") Long storeId, @Param("orderIds") List<Long> orderIds);    @Query("SELECT DISTINCT o.orderId FROM Order o JOIN o.orderItems oi WHERE o.storeId = :storeId AND oi.productId IN :productIds")
    List<Long> findOrderIdsByProductIds(@Param("storeId") Long storeId, @Param("productIds") List<Long> productIds);

}
