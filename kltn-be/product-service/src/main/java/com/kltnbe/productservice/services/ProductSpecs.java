package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.StoreProductFilter;
import com.kltnbe.productservice.entities.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecs {

    public static Specification<Product> byStoreAndFilter(Long storeId, StoreProductFilter f) {
        return (root, cq, cb) -> {
            List<Predicate> ps = new ArrayList<>();
            ps.add(cb.equal(root.get("storeId"), storeId));

            if (f != null) {
                if (f.q() != null && !f.q().isBlank()) {
                    String like = "%" + f.q().trim().toLowerCase() + "%";
                    ps.add(cb.like(cb.lower(root.get("productTitle")), like));
                }
                if (f.category() != null && !f.category().isBlank()) {
                    // đang map "category" vào productType cho đơn giản
                    ps.add(cb.equal(root.get("productType"), f.category()));
                }
                if (f.minPrice() != null) {
                    ps.add(cb.greaterThanOrEqualTo(root.get("productPrice"), BigDecimal.valueOf(f.minPrice())));
                }
                if (f.maxPrice() != null) {
                    ps.add(cb.lessThanOrEqualTo(root.get("productPrice"), BigDecimal.valueOf(f.maxPrice())));
                }
                if (Boolean.TRUE.equals(f.discountOnly())) {
                    ps.add(cb.greaterThan(root.get("percentDiscount"), 0d));
                }
            }
            return cb.and(ps.toArray(new Predicate[0]));
        };
    }

    public static Sort sortOf(String sort) {
        if (sort == null) return Sort.by(Sort.Direction.DESC, "updatedAt");
        return switch (sort) {
            case "new"        -> Sort.by(Sort.Direction.DESC, "createdAt");
            case "bestseller" -> Sort.by(Sort.Direction.DESC, "numberOfRatings"); // hoặc trường khác
            case "priceAsc"   -> Sort.by(Sort.Direction.ASC, "productPrice");
            case "priceDesc"  -> Sort.by(Sort.Direction.DESC, "productPrice");
            default           -> Sort.by(Sort.Direction.DESC, "updatedAt");
        };
    }
}
