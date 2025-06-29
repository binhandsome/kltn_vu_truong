// Service: ProductService.java
package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.req.ProductFileterAll;
import com.kltnbe.productservice.dtos.req.ProductFilterRequest;
//import com.kltnbe.productservice.dtos.res.ProductFilterResponse;
//import com.kltnbe.productservice.dtos.res.ProductSearchResponse;
import com.kltnbe.productservice.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    Page<Product> getAllProducts(ProductFileterAll productFileterAll);
    Page<Product> findProductBySalesRank(String salesRank, Pageable pageable);
    Page<Product> findProductByProductType(String productType, Pageable pageable);
    List<String> getAllSalesRanks();
    List<String> getAllProductTypes();
    Optional<Product> findProductDetail(String asin);
}