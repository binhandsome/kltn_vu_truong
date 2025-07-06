package com.kltnbe.productservice.controllers;


import com.kltnbe.productservice.dtos.ProductFilterDTO;
import com.kltnbe.productservice.dtos.req.ProductFileterAll;
import com.kltnbe.productservice.dtos.req.ProductFilterRequest;
//import com.kltnbe.productservice.dtos.res.ProductFilterResponse;
//import com.kltnbe.productservice.dtos.res.ProductSearchResponse;
import com.kltnbe.productservice.dtos.res.CategoryWithImage;
import com.kltnbe.productservice.dtos.res.ProductFilterResponse;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.repositories.ProductRepository;
import com.kltnbe.productservice.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;
    @GetMapping("/getAllProduct")
    public Page<Product> getAllProducts(ProductFileterAll productFileterAll) {
//        System.out.print(productService.getAllProducts(productFileterAll).get().findFirst().get().getImages().get(0).getProduct());
        return productService.getAllProducts(productFileterAll);
    }
    @GetMapping("/filterCategories")
    public ProductFilterResponse filterProductByCategories(ProductFilterRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        ProductFilterResponse response = new ProductFilterResponse();
        Pageable limit1 = PageRequest.of(0, 1);

        if (req.getSalesRank() != null) {
            Page<Product> products = productService.findProductBySalesRank(req.getSalesRank(), pageable);
            response.setProducts(products);
            // lấy luôn danh sách salesRank + ảnh random
            List<String> salesRanks = productService.getAllSalesRanks();
            List<CategoryWithImage> salesRankCategories = new ArrayList<>();

            for (String rank : salesRanks) {
                String thumb = productRepository.findRandomThumbnailBySalesRank(rank, limit1)
                        .stream().findFirst().orElse("/default-category.png");
                salesRankCategories.add(new CategoryWithImage(rank, thumb));
            }
            response.setSalesRanks(salesRanks);
            response.setSalesRankCategories(salesRankCategories);
            System.out.print("salesRank and Categories" + salesRankCategories);
        } else if (req.getProductType() != null) {
            Page<Product> products = productService.findProductByProductType(req.getProductType(), pageable);
            response.setProducts(products);
            // tương tự cho productTypes
            List<String> productTypes = productService.getAllProductTypes();
            List<CategoryWithImage> productTypeCategories = new ArrayList<>();
            for (String type : productTypes) {
                String thumb = productRepository.findRandomThumbnailByProductType(type, limit1)
                        .stream().findFirst().orElse("/default-category.png");
                productTypeCategories.add(new CategoryWithImage(type, thumb));
            }
            response.setProductTypes(productTypes);
            response.setProductTypeCategories(productTypeCategories);
            System.out.print("salesRank and Categories" + productTypeCategories);
        }
        return response;
    }
    @GetMapping("/api/products/{asin}")
    public ResponseEntity<Object> getProductDetail(@PathVariable String asin) {
        return productService.getProductDetail(asin)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found")
                );
    }

    @PostMapping("/filter")
    public ResponseEntity<Page<Product>> filterProducts(@RequestBody ProductFilterDTO filter) {
        return ResponseEntity.ok(productService.filterProducts(filter));
    }

}