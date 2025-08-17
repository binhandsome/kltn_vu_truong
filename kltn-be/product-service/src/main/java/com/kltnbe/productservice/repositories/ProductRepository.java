package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.dtos.CategoryCountDTO;
import com.kltnbe.productservice.dtos.ProductStatsDTO;
import com.kltnbe.productservice.dtos.ProductSuggestionProjection;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.enums.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>,JpaSpecificationExecutor<Product> {
    interface GroupThumbRow {
        String getGroupLabel();
        String getProductThumbnail();
        long getCount();
    }
//    @Query("SELECT p FROM Product p WHERE LOWER(p.productTitle) LIKE LOWER(CONCAT('%', :keyword, '%'))")
//    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    Page<Product> findAll(Pageable pageable);
    Page<Product> findProductBySalesRank(String salesRank, Pageable pageable);
    Page<Product> findProductByProductType(String productType, Pageable pageable);
    Page<Product> findProductByTags(String tags, Pageable pageable);
    @Query("SELECT DISTINCT COALESCE(p.salesRank, 'Other') FROM Product p")
    List<String> findAllDistinctSalesRanks();
    @Query("SELECT DISTINCT COALESCE(p.productType, 'Other') FROM Product p")
    List<String> findAllDistinctProductTypes();
    // ProductType cũng gom luôn count + random thumbnail
    interface ProductTypeCategory {
        String getGroupLabel();
        Long getCount();
        String getThumbnail();
    }

    @Query(value = """
        SELECT group_label AS groupLabel,
               cnt AS count,
               product_thumbnail AS thumbnail
        FROM (
            SELECT
              COALESCE(p.product_type,'Other') AS group_label,
              COUNT(*) OVER (PARTITION BY COALESCE(p.product_type,'Other')) AS cnt,
              p.product_thumbnail,
              ROW_NUMBER() OVER (
                  PARTITION BY COALESCE(p.product_type,'Other')
                  ORDER BY RAND()
              ) AS rn
            FROM products p
            WHERE p.product_thumbnail IS NOT NULL
        ) t
        WHERE rn = 1
        """, nativeQuery = true)
    List<ProductTypeCategory> findProductTypeCategories();
    // Projection interface để map kết quả
    interface SalesRankCategory {
        String getGroupLabel();
        Long getCount();
        String getThumbnail();
    }

    @Query(value = """
        SELECT group_label AS groupLabel,
               cnt AS count,
               product_thumbnail AS thumbnail
        FROM (
            SELECT
              COALESCE(p.sales_rank,'Other') AS group_label,
              COUNT(*) OVER (PARTITION BY COALESCE(p.sales_rank,'Other')) AS cnt,
              p.product_thumbnail,
              ROW_NUMBER() OVER (
                  PARTITION BY COALESCE(p.sales_rank,'Other')
                  ORDER BY RAND()
              ) AS rn
            FROM products p
            WHERE p.product_thumbnail IS NOT NULL
        ) t
        WHERE rn = 1
        """, nativeQuery = true)
    List<SalesRankCategory> findSalesRankCategories();
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
    List<Product> findAllByAsinIn(List<String> asins);
    @Query("SELECT COALESCE(p.salesRank, 'Other'), COUNT(p) FROM Product p GROUP BY COALESCE(p.salesRank, 'Other')")
    List<Object[]> countProductsBySalesRanks();
    @Query("SELECT COALESCE(p.productType, 'Other'), COUNT(p) FROM Product p GROUP BY COALESCE(p.productType, 'Other')")
    List<Object[]> countProductsByProductType();
    @Query("SELECT COALESCE(p.tags, 'Other'), COUNT(p) FROM Product p GROUP BY COALESCE(p.tags, 'Other')")
    List<Object[]> countProductsByTags();
    Page<Product> findProductByProductTitleContains(String productTitle, Pageable pageable);
    List<Product> findByStoreId(Long storeId);
    Page<Product> findByStoreId(Long storeId, Pageable pageable);
    @Query("SELECT p.productId FROM Product p WHERE p.storeId = :storeId")
    List<Long> findProductIdsByStoreId(@Param("storeId") Long storeId);
    // Hoặc nếu dùng Optional để tránh null
    @Query("SELECT p.productTitle FROM Product p WHERE p.productId = :productId")
    Optional<String> findProductNameById(@Param("productId") Long productId);
    @Query("SELECT p.storeId FROM Product p WHERE p.productId = :productId")
    Optional<Long> findStoreIdByProductId(@Param("productId") Long productId);
    Optional<Product> findByAsin(String asin);
    @Query("SELECT COUNT(p) FROM Product p")
    Long countAllProducts();
    @Query("SELECT COALESCE(p.productStatus, 'Other'), COUNT(p) FROM Product p GROUP BY COALESCE(p.productStatus, 'Other')")
    List<Object[]> countProductsByProductStatus();
    // Thống kê sản phẩm theo cửa hàng (store)
    @Query("SELECT p.storeId, COUNT(p) FROM Product p WHERE p.storeId IS NOT NULL GROUP BY p.storeId")
    List<Object[]> countProductsByStoreId();


    // Thống kê sản phẩm theo tháng tạo
    @Query("SELECT FUNCTION('MONTH', p.createdAt), COUNT(p) FROM Product p GROUP BY FUNCTION('MONTH', p.createdAt)")
    List<Object[]> countProductsByCreatedMonth();
    @Query("""
   SELECT p FROM Product p
   WHERE (:status IS NULL OR p.productStatus = :status)
     AND p.percentDiscount IS NOT NULL
   ORDER BY p.percentDiscount DESC, p.updatedAt DESC
""")
    Page<Product> findTopDiscounted(@Param("status") ProductStatus status, Pageable pageable);
//    Xu li lien quan den store
@Query("""
        select new com.kltnbe.productservice.dtos.CategoryCountDTO(p.productType, count(p))
        from Product p
        where p.storeId = :storeId and p.productType is not null
        group by p.productType
    """)
List<CategoryCountDTO> countProductTypeByStore(@Param("storeId") Long storeId);

    @Query("""
        select new com.kltnbe.productservice.dtos.CategoryCountDTO(p.salesRank, count(p))
        from Product p
        where p.storeId = :storeId and p.salesRank is not null
        group by p.salesRank
    """)
    List<CategoryCountDTO> countSalesRankByStore(@Param("storeId") Long storeId);

    @Query("""
        select new com.kltnbe.productservice.dtos.CategoryCountDTO(p.tags, count(p))
        from Product p
        where p.storeId = :storeId and p.tags is not null
        group by p.tags
    """)
    List<CategoryCountDTO> countTagsByStore(@Param("storeId") Long storeId);

    @Query("""
        select count(p) from Product p
        where p.storeId = :storeId and p.percentDiscount is not null and p.percentDiscount > 0
    """)
    long countDiscountingByStore(@Param("storeId") Long storeId);
    @Query(value = """
        SELECT 
          p.product_id        AS productId,
          p.asin              AS asin,
          p.product_title     AS productTitle,
          p.product_thumbnail AS productThumbnail,
          p.product_price     AS productPrice
        FROM products p
        WHERE p.product_status = 'active'
          AND p.product_title COLLATE utf8mb4_general_ci LIKE CONCAT('%', :q, '%')
        ORDER BY p.number_of_ratings DESC, p.created_at DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<ProductSuggestionProjection> searchLike(@Param("q") String q, @Param("limit") int limit);

    // B) FULLTEXT: rất nhanh cho câu dài (yêu cầu FULLTEXT index)
    @Query(value = """
        SELECT 
          p.product_id        AS productId,
          p.asin              AS asin,
          p.product_title     AS productTitle,
          p.product_thumbnail AS productThumbnail,
          p.product_price     AS productPrice
        FROM products p
        WHERE p.product_status = 'active'
          AND MATCH(p.product_title, p.brand_name, p.tags) AGAINST (:q IN BOOLEAN MODE)
        ORDER BY p.number_of_ratings DESC, p.created_at DESC
        LIMIT :limit
        """, nativeQuery = true)
    List<ProductSuggestionProjection> searchFullText(@Param("q") String booleanModeQuery,
                                                     @Param("limit") int limit);
    List<Product> findTop20ByOrderByQuantitySoldDesc();


}