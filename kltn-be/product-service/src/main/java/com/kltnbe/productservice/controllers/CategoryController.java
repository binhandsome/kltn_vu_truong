package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/hierarchy")
    public Map<String, Integer> getCategoryHierarchy() {
        return categoryService.getCategoryHierarchyWithCounts();
    }
}
