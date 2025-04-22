// ===== File: repositories/ProductRepository.java =====
package com.demo.repositories;
import com.demo.dtos.ProductCardDTO;
import com.demo.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("""
        SELECT new com.demo.dtos.ProductCardDTO(
            p.productId,
            p.productTitle,
            p.productPrice,
            pi.imageData,
            p.brandName,
            pr.discountValue
        )
        FROM Product p
        LEFT JOIN ProductImage pi ON pi.productAsin = p.asin AND pi.isMainImage = true
        LEFT JOIN Promotion pr ON pr.product = p AND pr.isActive = true
    """)
    List<ProductCardDTO> findProductCards();
}
