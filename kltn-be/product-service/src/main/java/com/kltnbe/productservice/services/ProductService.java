// Service: ProductService.java
package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.ProductStatsDTO;
import com.kltnbe.productservice.dtos.req.ProductFileterAll;
import com.kltnbe.productservice.dtos.req.ProductRequestDTO;
import com.kltnbe.productservice.dtos.req.SizeRequest;
import com.kltnbe.productservice.dtos.res.EvaluateResponse;
import com.kltnbe.productservice.dtos.res.ProductResponse;
import com.kltnbe.productservice.entities.Color;
import com.kltnbe.productservice.entities.MoreProductInfo;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductSize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
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
    ResponseEntity<?> createProduct(ProductRequestDTO productRequestDTO, Long authId);
    Optional<ProductResponse> getProductDetail(String asin, Long authId);
    Optional<ProductResponse> getProductDetailAdmin(String asin);

    ResponseEntity<?> addSize(SizeRequest request, Long authId);
    void deleteSize(Long sizeId, Long authId);
    void saveImageForColor(String asin, Long colorId, MultipartFile file, Long authId);
    void setThumbnail(String asin, Long imageId, Long authId);
    void updateImage(MultipartFile file, Long imageId, Long authId);
    void deleteImageById(Long imageId, Long authId);
    ResponseEntity<?> updateProduct(ProductRequestDTO request, Long authId);
    ResponseEntity<?> deleteProductByAsin(String asin, Long authId);
    List<ProductResponse> getProductsByStoreId(Long storeId);
    void updateStatus(Long productId, String status);
    List<Long> getProductIdsByStore(Long storeId);
    Optional<String> findProductNameById(Long productId);
    ProductResponse getProductById(Long idProduct);
    List<ProductResponse> getProductsByStoreId(Long storeId, Long authId);
    void updateStatus(Long productId, String status, Long authId);
    Optional<Long> getStoreIdByProductId(Long productId);
    List<ProductStatsDTO> getProductCountByStatus();
    List<ProductStatsDTO> getProductCountByType();
    Long getTotalProductCount();
    List<ProductStatsDTO> getProductCountByStore();
    ResponseEntity<?> deleteProductByAsinAdmin(String asin);
    // Thống kê số lượng sản phẩm theo tháng tạo
    List<ProductStatsDTO> getProductCountByCreatedMonth();
    String evaluateByUserWithItemOrder(String comment, Long orderItemId,List<MultipartFile> files,String productAsin, int rating);
    EvaluateResponse getEvaluateResponseByOrderItemId(Long orderItemId);
    String updateCommentVyEvaluate(Long idEvaluate,String commentBySeller);
    String actionStatusEvaluate(Long idEvaluate, int status);
    List<EvaluateResponse> getEvaluateByProductAsin(String asin);
}