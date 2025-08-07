package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.EvaluateProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EvaluateProductRepository extends JpaRepository<EvaluateProduct,Long> {
    Optional<EvaluateProduct> findByOrderItemId(Long orderItemId);
    List<EvaluateProduct> findByProductAsin(String productAsin);
}
