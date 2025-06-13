package com.kltnbe.cartservice.repositories;

import com.kltnbe.cartservice.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}