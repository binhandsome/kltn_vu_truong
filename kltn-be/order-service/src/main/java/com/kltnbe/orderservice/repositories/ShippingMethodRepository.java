package com.kltnbe.orderservice.repositories;

import com.kltnbe.orderservice.entities.Order;
import com.kltnbe.orderservice.entities.ShippingMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShippingMethodRepository extends JpaRepository<ShippingMethod, Long> {
    List<ShippingMethod> findAllByIsActiveTrue();
}
