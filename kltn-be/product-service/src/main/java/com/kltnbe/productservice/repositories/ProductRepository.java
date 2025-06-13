package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByAsin(String asin);
}