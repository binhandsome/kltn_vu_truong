package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.ProductSize;
import org.hibernate.engine.jdbc.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
        Optional<ProductSize> findBySizeName(String sizeName);

}