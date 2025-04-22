// ===== File: controllers/ProductController.java =====
package com.demo.controllers;

import com.demo.dtos.ProductCardDTO;
import com.demo.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/cards")
    public List<ProductCardDTO> getProductCards() {

        return productRepository.findProductCards();
    }
}
