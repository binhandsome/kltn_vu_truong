package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.services.ProductSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sizes")
public class ProductSizeController {

    @Autowired
    private ProductSizeService productSizeService;

    @GetMapping("/getAll")
    public ResponseEntity<List<String>> getAllUniqueSizes() {
        List<String> sizes = productSizeService.getAllUniqueSizes();
        return ResponseEntity.ok(sizes);
    }
}
