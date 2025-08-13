package com.kltnbe.cartservice.repositories;

import com.kltnbe.cartservice.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart_CartIdAndAsinIn(String cartId, Collection<String> asins);
}