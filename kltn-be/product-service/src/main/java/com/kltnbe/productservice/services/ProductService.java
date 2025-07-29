// Service: ProductService.java
package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.req.ProductFileterAll;
import com.kltnbe.productservice.dtos.req.ProductRequestDTO;
import com.kltnbe.productservice.dtos.req.SizeRequest;
import com.kltnbe.productservice.dtos.res.ProductResponse;
import com.kltnbe.productservice.entities.Color;
import com.kltnbe.productservice.entities.MoreProductInfo;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductSize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    Page<Product> getAllProducts(ProductFileterAll productFileterAll);
    Page<Product> findProductBySalesRank(String salesRank, Pageable pageable);
    Page<Product> findProductByProductType(String productType, Pageable pageable);
    Page<Product> findProductByTags(String tags, Pageable pageable);
    List<String> getAllSalesRanks();
    List<String> getAllProductTypes();
    Optional<Product> findProductDetail(String asin);
    List<Product> getListProductByListAsin(List<String> asin);
    List<Product> getProductsByIds(List<Long> ids);
    MoreProductInfo findMoreProductInfoById(Long id);
    List<Color> findColorByStatus(Integer status);
    ResponseEntity<?> createProduct(ProductRequestDTO productRequestDTO);
    Optional<ProductResponse> getProductDetail(String asin);
    ResponseEntity<?> addSize(SizeRequest request);
    void deleteSize(Long sizeId);
    void saveImageForColor(String asin, Long colorId, MultipartFile file);
    void setThumbnail(String asin, Long imageId);
    void updateImage(MultipartFile file, Long imageId);
    void deleteImageById(Long imageId);
    ResponseEntity<?> updateProduct(ProductRequestDTO request);
    ResponseEntity<?> deleteProductByAsin(String asin);
    List<ProductResponse> getProductsByStoreId(Long storeId);
    void updateStatus(Long productId, String status);
}