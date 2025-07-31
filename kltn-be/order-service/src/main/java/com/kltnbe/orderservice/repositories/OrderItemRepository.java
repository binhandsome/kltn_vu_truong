package com.kltnbe.orderservice.repositories;

import com.kltnbe.orderservice.entities.Order;
import com.kltnbe.orderservice.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);
    @Query("SELECT DISTINCT oi.order.orderId FROM OrderItem oi WHERE oi.productId IN :productIds")
    List<Long> findOrderIdsByProductIds(@Param("productIds") List<Long> productIds);
    List<OrderItem> findByProductIdIn(List<Long> productIds);
    List<OrderItem> findByOrderOrderIdIn(List<Long> orderIds);
}