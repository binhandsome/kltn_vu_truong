package com.kltnbe.productservice.repositories;

import com.kltnbe.productservice.entities.EvaluateProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EvaluateProductRepository extends JpaRepository<EvaluateProduct,Long> {
    Optional<EvaluateProduct> findByOrderItemId(Long orderItemId);
    List<EvaluateProduct> findByProductAsin(String productAsin);
    List<EvaluateProduct> findByProductAsinAndStatusOrderByCreatedAtDesc(String asin, int status);
    boolean existsByOrderItemId(Long orderItemId);
    long countByProductAsinAndStatus(String asin, int status);
    interface EvaluateSummaryRow {
        String getAsin();
        Long getReviewCount();
        Double getAvgRating();
    }

    @Query("""
      select e.productAsin as asin,
             count(e.evaluteId) as reviewCount,
             coalesce(avg(e.rating),0) as avgRating
      from EvaluateProduct e
      where e.status = 1 and e.productAsin in :asins
      group by e.productAsin
    """)
    List<EvaluateSummaryRow> findSummaryByAsinIn(@Param("asins") List<String> asins);

}
