package com.kltn.searchservice.dtos;

import java.util.List;

public record EsSearchResult<T>(
        List<T> content,
        long total,
        int totalPages,
        List<FacetBucket> productType, // để FE đọc facets.productType
        List<FacetBucket> salesRank,   // facets.salesRank
        List<FacetBucket> tags,        // facets.tags
        long discounting               // facets.discounting
) {}
