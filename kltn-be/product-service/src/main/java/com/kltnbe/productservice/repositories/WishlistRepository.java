package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUsername(String username);

    boolean existsByUsernameAndAsin(String username, String asin);

    void deleteByUsernameAndAsin(String username, String asin);
}


