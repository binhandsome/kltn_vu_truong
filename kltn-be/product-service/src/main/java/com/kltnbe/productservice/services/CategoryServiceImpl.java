package com.kltnbe.productservice.services;

import com.kltnbe.productservice.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Map<String, Integer> getCategoryHierarchyWithCounts() {
        List<String> rawCategories = categoryRepository.findAllCategoryPaths();
        Map<String, Integer> categoryCounts = new LinkedHashMap<>();

        for (String path : rawCategories) {
            String[] parts = path.split(">");
            StringBuilder currentPath = new StringBuilder();
            for (String part : parts) {
                String trimmed = part.trim();
                if (currentPath.length() > 0) {
                    currentPath.append(" > ");
                }
                currentPath.append(trimmed);
                categoryCounts.put(currentPath.toString(),
                        categoryCounts.getOrDefault(currentPath.toString(), 0) + 1);
            }
        }
        return categoryCounts;
    }
}

