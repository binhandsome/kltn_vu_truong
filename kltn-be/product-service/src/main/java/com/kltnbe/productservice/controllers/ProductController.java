package com.kltnbe.productservice.controllers;


import com.kltnbe.productservice.dtos.CategoryWithImageAndCount;
import com.kltnbe.productservice.dtos.req.ProductFileterAll;
import com.kltnbe.productservice.dtos.req.ProductFilterRequest;
import com.kltnbe.productservice.dtos.res.CategoryResponse;
import com.kltnbe.productservice.dtos.res.CategoryWithImage;
import com.kltnbe.productservice.dtos.res.ProductFilterResponse;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.repositories.ProductRepository;
import com.kltnbe.productservice.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


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
    @PostMapping("/getAllProduct")
    public Page<Product> getAllProductsPost(@RequestBody ProductFileterAll productFileterAll) {

        return productService.getAllProducts(productFileterAll);
    }

    @GetMapping("/getAllCategories")
    public CategoryResponse categoryResponse() {
        CategoryResponse categoryResponse = new CategoryResponse();

        // Lấy danh sách salesRank + count
        List<Object[]> results = productRepository.countProductsBySalesRanks();
        Map<String, Integer> salesRanksCount = new HashMap<>();
        List<CategoryWithImageAndCount> salesRankCategories = new ArrayList<>();

        for (Object[] result : results) {
            String rank = (String) result[0];
            Long count = (Long) result[1];
            salesRanksCount.put(rank, count.intValue());

            // 👉 Lấy ảnh thumbnail ngẫu nhiên tương ứng với rank
            String thumbnail = productRepository
                    .findRandomThumbnailBySalesRank(rank, PageRequest.of(0, 1))
                    .stream().findFirst().orElse(null);

            salesRankCategories.add(new CategoryWithImageAndCount(rank, count.intValue(), thumbnail));
        }

        categoryResponse.setSalesRankCount(salesRanksCount);
        categoryResponse.setSalesRankCategories(salesRankCategories); // ✅ Thêm danh sách có ảnh

        // Product Type
        List<Object[]> resultsProductType = productRepository.countProductsByProductType();
        Map<String, Integer> productTypeCount = new HashMap<>();
        for (Object[] result : resultsProductType) {
            String type = (String) result[0];
            Long count = (Long) result[1];
            productTypeCount.put(type, count.intValue());
        }
        categoryResponse.setProductTypeCount(productTypeCount);

        // Tags
        List<Object[]> resultsTags = productRepository.countProductsByTags();
        Map<String, Integer> tagsCount = new HashMap<>();
        for (Object[] result : resultsTags) {
            String tag = (String) result[0];
            Long count = (Long) result[1];
            tagsCount.put(tag, count.intValue());
        }
        categoryResponse.setTags(tagsCount);

        return categoryResponse;
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
        } else if (req.getTags() != null) {
            Page<Product> products = productService.findProductByTags(req.getTags(), pageable);
            response.setProducts(products);
            System.out.print("tags mame: ");
        }
        return response;
    }
    @GetMapping("/productDetail/{asin}")
    public ResponseEntity<?> findProductDetail(@PathVariable String asin) {
        Optional<Product> product = productService.findProductDetail(asin);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/listByAsin")
    public ResponseEntity<?> findProductListAsin(@RequestParam String asins) {
        List<String> asinList = Arrays.asList(asins.split(","));
        List<Product> products = productService.getListProductByListAsin(asinList);
        return ResponseEntity.ok(products);
    }


}