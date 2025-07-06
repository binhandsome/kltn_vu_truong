package com.kltnbe.productservice.services;

import java.util.Map;

public interface CategoryService {
    Map<String, Integer> getCategoryHierarchyWithCounts();
}
