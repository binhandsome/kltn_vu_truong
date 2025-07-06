package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {

    @Query("SELECT DISTINCT ps.sizeName FROM ProductSize ps WHERE ps.sizeName IS NOT NULL")
    List<String> findDistinctSizeNames();

    List<ProductSize> findByProductAsin(String asin);
}

