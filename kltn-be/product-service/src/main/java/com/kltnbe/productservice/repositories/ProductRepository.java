package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

//    @Query("SELECT p FROM Product p WHERE LOWER(p.productTitle) LIKE LOWER(CONCAT('%', :keyword, '%'))")
//    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    Page<Product> findAll(Pageable pageable);
    Page<Product> findProductBySalesRank(String salesRank, Pageable pageable);
    Page<Product> findProductByProductType(String productType, Pageable pageable);
    @Query("SELECT DISTINCT COALESCE(p.salesRank, 'Other') FROM Product p")
    List<String> findAllDistinctSalesRanks();
    @Query("SELECT DISTINCT COALESCE(p.productType, 'Other') FROM Product p")
    List<String> findAllDistinctProductTypes();
    @Query("SELECT p.productThumbnail FROM Product p " +
            "WHERE COALESCE(p.salesRank, 'Other') = :salesRank " +
            "AND p.productThumbnail IS NOT NULL " +
            "ORDER BY FUNCTION('RAND')")
    List<String> findRandomThumbnailBySalesRank(@Param("salesRank") String salesRank, Pageable pageable);
    @Query("SELECT p.productThumbnail FROM Product p " +
            "WHERE COALESCE(p.productType, 'Other') = :productType " +
            "AND p.productThumbnail IS NOT NULL " +
            "ORDER BY FUNCTION('RAND')")
    List<String> findRandomThumbnailByProductType(@Param("productType") String productType, Pageable pageable);
    Optional<Product> findProductByAsin(String asin);
}