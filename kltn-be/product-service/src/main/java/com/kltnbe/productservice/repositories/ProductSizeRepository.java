package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
        Optional<ProductSize> findBySizeName(String sizeName);
        List<ProductSize> findAllByProduct(Product product);
        boolean existsByProduct_AsinAndSizeName(String asin, String sizeName);

}