package com.kltnbe.productservice.entities;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> filterProducts(
        String search,
        Double minPrice,
        Double maxPrice,
        String color,
        String size,
        String category
    ) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Join sizes
            if (size != null && !size.isEmpty()) {
                Join<Object, Object> sizeJoin = root.join("productSizes", JoinType.LEFT);
                predicates.add(cb.equal(sizeJoin.get("sizeName"), size));
            }

            // Join categories
            if (category != null && !category.isEmpty()) {
                Join<Object, Object> categoryJoin = root.join("categories", JoinType.LEFT);
                predicates.add(cb.like(cb.lower(categoryJoin.get("categories")), "%" + category.toLowerCase() + "%"));
            }

            // Color lọc qua chuỗi color_asin
            if (color != null && !color.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("colorAsin")), "%" + color.toLowerCase() + "%"));
            }

            // Price range
            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("productPrice"), minPrice));
            }
            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("productPrice"), maxPrice));
            }

            // Search keyword
            if (search != null && !search.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("productTitle")), "%" + search.toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
