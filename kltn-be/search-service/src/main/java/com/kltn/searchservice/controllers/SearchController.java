package com.kltn.searchservice.controllers;

import com.kltn.searchservice.dtos.ProductDocument;
import com.kltn.searchservice.dtos.ProductDto;
import com.kltn.searchservice.dtos.res.SearchResponse;
import com.kltn.searchservice.helpers.ProductServiceProxy;
import com.kltn.searchservice.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor

public class SearchController {
    @Autowired
    private ProductServiceProxy productServiceProxy;
    @Autowired
    private SearchService searchService;

    @PostMapping("/sync")
    public String syncProducts() throws IOException {
        searchService.syncProducts();
        return "dong bo thanh cong vao elasticsearch";
    }
    @PostMapping("index")
    public String indexProduct(@RequestBody ProductDto productDto) throws IOException {
        searchService.indexProduct(productDto);
        return "index thanh cong";
    }
    @GetMapping("/search")
    public ResponseEntity<SearchResponse<ProductDocument>> searchProducts(@RequestParam String keyword, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) throws IOException {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDocument> resultPage = searchService.searchProductByTitle(keyword, pageable);
        SearchResponse<ProductDocument> response = new SearchResponse<>();
        response.setContent(resultPage.getContent());
        response.setPageNumber(resultPage.getNumber());
        response.setPageSize(resultPage.getSize());
        response.setTotalPages(resultPage.getTotalPages());
        response.setLast(resultPage.isLast());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/searchPrice")
    public ResponseEntity<SearchResponse<ProductDocument>> searchProductsPrice(@RequestParam BigDecimal minPrice,@RequestParam BigDecimal maxPrice, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDocument> resultPage = searchService.searchByPriceRange(minPrice, maxPrice,pageable);
        SearchResponse<ProductDocument> response = new SearchResponse<>();
        response.setContent(resultPage.getContent());
        response.setPageNumber(resultPage.getNumber());
        response.setPageSize(resultPage.getSize());
        response.setTotalPages(resultPage.getTotalPages());
        response.setLast(resultPage.isLast());
        return ResponseEntity.ok(response);
    }
}
