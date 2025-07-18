// ServiceImpl: ProductServiceImpl.java
package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.req.ProductFileterAll;
import com.kltnbe.productservice.dtos.req.ProductFilterRequest;
//import com.kltnbe.productservice.dtos.res.ProductFilterResponse;
//import com.kltnbe.productservice.dtos.res.ProductSearchResponse;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.repositories.ProductRepository;
import com.kltnbe.productservice.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    public Page<Product> getAllProducts(ProductFileterAll productFileterAll) {
        Pageable pageable = PageRequest.of(productFileterAll.getPage(), productFileterAll.getSize());
        return productRepository.findAll(pageable);
    }
    public Page<Product> findProductBySalesRank(String salesRank, Pageable pageable){
        return productRepository.findProductBySalesRank(salesRank, pageable);
    }
    public Page<Product> findProductByProductType(String productType, Pageable pageable ) {
        return productRepository.findProductByProductType(productType, pageable);
    }
    public Page<Product> findProductByTags(String tags, Pageable pageable ) {
        return productRepository.findProductByTags(tags, pageable);
    }

    @Override
    public List<String> getAllSalesRanks() {
        return productRepository.findAllDistinctSalesRanks();
    }

    @Override
    public List<String> getAllProductTypes() {
        return productRepository.findAllDistinctProductTypes();
    }
    @Override
    public Optional<Product> findProductDetail(String asin) {
        return productRepository.findProductByAsin(asin);
    }

    @Override
    public List<Product> getListProductByListAsin(List<String> asin) {
        System.out.print(asin + "asin cua tao la");
        List<Product> productList = productRepository.findAllByAsinIn(asin);
        return productList;
    }
    @Override
    public List<Product> getProductsByIds(List<Long> ids) {
        return productRepository.findAllById(ids);
    }




}