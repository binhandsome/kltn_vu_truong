package com.kltnbe.productservice.dtos;

public record StoreProductFilter(
        String q,            // từ khoá
        String sort,         // "", "new", "bestseller", "priceAsc", "priceDesc"
        String category,     // tuỳ bạn map vào productType (mặc định)
        Double minPrice,
        Double maxPrice,
        Boolean discountOnly
) {}
