package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.Category;
import com.kltnbe.productservice.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByProduct(Product product);

    List<Category> findByProduct_Asin(String asin);}
