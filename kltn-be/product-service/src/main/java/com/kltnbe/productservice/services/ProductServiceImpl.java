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
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

//    @Override
//    public Page<ProductSearchResponse> searchProducts(String keyword, Pageable pageable) {
//        return productRepository.searchByKeyword(keyword, pageable).map(product -> {
//            ProductSearchResponse dto = new ProductSearchResponse();
//            dto.setProductId(product.getProductId());
//            dto.setProductTitle(product.getProductTitle());
//            dto.setProductThumbnail(product.getProductThumbnail());
//            dto.setBrandName(product.getBrandName());
//            dto.setAverageRating(product.getAverageRating());
//            dto.setNumberOfRatings(product.getNumberOfRatings());
//
//            BigDecimal originalPrice = product.getProductPrice();
//            dto.setOriginalPrice(originalPrice);
//
//            int discount = 0; // nếu có discount thì tính, hiện tại chưa có bảng riêng nên hardcode 0
//            if (discount > 0) {
//                BigDecimal discountAmount = originalPrice
//                        .multiply(BigDecimal.valueOf(discount))
//                        .divide(BigDecimal.valueOf(100));
//                dto.setProductPrice(originalPrice.subtract(discountAmount));
//                dto.setDiscountPercent(discount);
//            } else {
//                dto.setProductPrice(originalPrice);
//                dto.setDiscountPercent(0);
//            }
//
//            return dto;
//        });
//    }
//    @Override
//    public Page<ProductFilterResponse> filterProducts(ProductFilterRequest req) {
//        Specification<Product> spec = (root, query, cb) -> cb.conjunction();
//
//        if (req.getCategoryId() != null) {
//            spec = spec.and((root, query, cb) -> cb.equal(root.get("category").get("categoryId"), req.getCategoryId()));
//        }
//        if (req.getBrandName() != null) {
//            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("brandName")), "%" + req.getBrandName().toLowerCase() + "%"));
//        }
//        if (req.getMinPrice() != null) {
//            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("productPrice"), req.getMinPrice()));
//        }
//        if (req.getMaxPrice() != null) {
//            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("productPrice"), req.getMaxPrice()));
//        }
//        if (req.getMinRating() != null) {
//            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("averageRating"), req.getMinRating()));
//        }
//        if (req.getKeyword() != null) {
//            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("productTitle")), "%" + req.getKeyword().toLowerCase() + "%"));
//        }
//
//        Page<Product> productPage = productRepository.findAll(spec, PageRequest.of(req.getPage(), req.getSize()));
//
//        return productPage.map(product -> {
//            ProductFilterResponse res = new ProductFilterResponse();
//            res.setProductId(product.getProductId());
//            res.setProductTitle(product.getProductTitle());
//            res.setProductPrice(product.getProductPrice());
//            res.setAverageRating(product.getAverageRating());
//            res.setProductThumbnail(product.getProductThumbnail());
//            res.setBrandName(product.getBrandName());
//            return res;
//        });
//    }
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

    @Override
    public List<String> getAllSalesRanks() {
        return productRepository.findAllDistinctSalesRanks();
    }

    @Override
    public List<String> getAllProductTypes() {
        return productRepository.findAllDistinctProductTypes();
    }


}