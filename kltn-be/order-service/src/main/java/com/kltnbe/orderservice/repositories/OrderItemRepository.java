package com.kltnbe.orderservice.repositories;

import com.kltnbe.orderservice.entities.Order;
import com.kltnbe.orderservice.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);
}