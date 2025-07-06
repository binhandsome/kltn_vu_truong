package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c.categories FROM Category c WHERE c.categories IS NOT NULL")
    List<String> findAllCategoryPaths();

    Optional<Category> findByProductAsin(String asin);
}
