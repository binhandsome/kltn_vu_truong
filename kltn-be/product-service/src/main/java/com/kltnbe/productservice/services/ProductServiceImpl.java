// ServiceImpl: ProductServiceImpl.java
package com.kltnbe.productservice.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kltnbe.productservice.clients.SearchServiceProxy;
import com.kltnbe.productservice.clients.SellerServiceProxy;
import com.kltnbe.productservice.dtos.*;
import com.kltnbe.productservice.dtos.req.*;
import com.kltnbe.productservice.dtos.res.EvaluateResponse;
import com.kltnbe.productservice.dtos.res.ProductResponse;
import com.kltnbe.productservice.entities.*;
import com.kltnbe.productservice.enums.ProductStatus;
import com.kltnbe.productservice.repositories.*;
import io.micrometer.common.lang.Nullable;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    private final MoreProductInfoRepository moreProductInfoRepository;
    private final ColorRepository colorRepository;
    private final SellerServiceProxy sellerServiceProxy;
    private final CategoryRepository categoryRepository;
    private final ProductSizeRepository productSizeRepository;
    private final ProductSizeRepository sizeRepository;
    private final ProductImageRepository productImageRepository;
    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);
    private final ModelMapper modelMapper;
    @Autowired
    private ObjectMapper objectMapper; // từ Jackson
    @Autowired
    private ProductVariantRepository productVariantRepository;
    private final AsyncUploadService asyncUploadService;
    @Autowired
    private SearchServiceProxy searchServiceProxy;
    private EvaluateProductRepository evaluateProductRepository;

    public Page<Product> getAllProducts(ProductFileterAll productFileterAll) {
        Pageable pageable = PageRequest.of(productFileterAll.getPage(), productFileterAll.getSize());
        return productRepository.findAll(pageable);
    }

    public Page<Product> findProductBySalesRank(String salesRank, Pageable pageable) {
        return productRepository.findProductBySalesRank(salesRank, pageable);
    }

    public Page<Product> findProductByProductType(String productType, Pageable pageable) {
        return productRepository.findProductByProductType(productType, pageable);
    }

    public Page<Product> findProductByTags(String tags, Pageable pageable) {
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

    @Override
    public MoreProductInfo findMoreProductInfoById(Long id) {
        return moreProductInfoRepository.findByMoreProductId(1L);
    }

    @Override
    public List<Color> findColorByStatus(Integer status) {
        return colorRepository.findAllByStatus(1);
    }
    @Transactional
    @Override
    public ResponseEntity<?> createProduct(ProductRequestDTO request, Long authId) {
        if (request.getShopId() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "❌ Thất bại: Chưa có shop"));
        }
        System.out.println(request.toString() + "request cua toi la");
        validateShopOwnership(request.getShopId(), authId);

        String asin = generateRandomAsin(10);

        if (request.getShopId() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "❌ Thất bại: Chưa có shop"));
        }

        try {
            List<Color> colors = colorRepository.findByNameColorIn(request.getSelectedColors());
            List<ColorDTO> colorDTOs = colors.stream()
                    .map(ColorDTO::new)
                    .collect(Collectors.toList());

            String json = objectMapper.writeValueAsString(colorDTOs);
            TitleAndImgSeller titleAndImgSeller = sellerServiceProxy.getTitleAndImgSeller(request.getShopId()).getBody();
            String jsonTitleAndThumbnail = objectMapper.writeValueAsString(titleAndImgSeller);

            Product product = new Product();
            product.setAsin(asin);
            product.setProductTitle(request.getNameProduct());
            product.setBrandName(request.getNameBrand());
            product.setProductPrice(BigDecimal.valueOf(request.getPrice()));
            product.setProductStatus(ProductStatus.valueOf(request.getProductStatus()));
            product.setPercentDiscount(Double.valueOf((request.getDiscountPercent())));
            product.setColorAsin(json);
            product.setTags(request.getSelectedGender());
            product.setProductType(request.getSelectedType());
            product.setSalesRank(request.getSelectedCategory());
            product.setStoreId(request.getShopId());
            product.setStoreThumTitle(jsonTitleAndThumbnail);
            productRepository.save(product);

            if (request.getCategoryList() != null && !request.getCategoryList().isEmpty()) {
                String jsonCategories = objectMapper.writeValueAsString(request.getCategoryList());

                Category category = new Category();
                category.setCategories(jsonCategories); // field kiểu String JSON
                category.setProduct(product);
                category.setDescription(request.getDescription());
                categoryRepository.save(category);
            }
            Optional<Product> product1 = productRepository.findProductByAsin(product.getAsin());
            ProductDto productDto = new ProductDto();
            productDto.setProductId(product.getProductId());
            productDto.setAsin(product.getAsin() != null ? product.getAsin() : "");
            productDto.setProductTitle(product.getProductTitle() != null ? product.getProductTitle() : "");
            productDto.setProductPrice(product.getProductPrice() != null ? product.getProductPrice() : BigDecimal.ZERO);
            productDto.setProductThumbnail(product.getProductThumbnail() != null ? product.getProductThumbnail() : "");
            productDto.setSalesRank(product.getSalesRank());
            productDto.setProductType(product.getProductType() != null ? product.getProductType() : "");
            productDto.setStoreId(product.getStoreId());
            productDto.setPercentDiscount(product.getPercentDiscount() != null ? product.getPercentDiscount() : 0);
            productDto.setStockQuantity(product.getStockQuantity() != null ? product.getStockQuantity() : 0);
            productDto.setTags(product.getTags());
            productDto.setProductStatus(product.getProductStatus() != null ? String.valueOf(product.getProductStatus()) : "UNKNOWN");
            String message = searchServiceProxy.indexProduct(productDto);
            return ResponseEntity.ok(Map.of("message", "✅ Thêm sản phẩm thành công. Mã ASIN: " + asin + message, "dataAsin", product1.get().getAsin()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("message", "❌ Lỗi server: " + e.getMessage()));
        }
    }

    @Transactional
    @Override
    public ResponseEntity<?> updateProduct(ProductRequestDTO request, Long authId) {

        System.out.println("📥 Dữ liệu nhận từ client:");
        System.out.println("ASIN: " + request.getAsin());
        System.out.println("Name: " + request.getNameProduct());
        System.out.println("Brand: " + request.getNameBrand());
        System.out.println("Price: " + request.getPrice());
        System.out.println("Status: " + request.getProductStatus());
        System.out.println("CategoryList: " + request.getCategoryList());
        System.out.println("Selected Colors: " + request.getSelectedColors());
        System.out.println("Description: " + request.getDescription());

        try {
            // Tìm sản phẩm theo ASIN
            Product product = productRepository.findProductByAsin(request.getAsin())
                    .orElseThrow(() -> new RuntimeException("❌ Không tìm thấy sản phẩm với ASIN: " + request.getAsin()));
validateShopOwnership(product.getStoreId(), authId);
            // Lấy danh sách màu từ selectedColors (dựa theo tên màu)
            List<Color> colors = colorRepository.findByNameColorIn(request.getSelectedColors());
            List<ColorDTO> colorDTOs = colors.stream()
                    .map(ColorDTO::new)
                    .collect(Collectors.toList());

            String jsonColors = objectMapper.writeValueAsString(colorDTOs);

            // Cập nhật thông tin sản phẩm
            product.setProductTitle(request.getNameProduct());
            product.setBrandName(request.getNameBrand());
            product.setProductPrice(BigDecimal.valueOf(request.getPrice()));
            product.setProductStatus(ProductStatus.valueOf(request.getProductStatus()));
            product.setPercentDiscount(Double.valueOf(request.getDiscountPercent()));
            product.setColorAsin(jsonColors);
            product.setTags(request.getSelectedGender());
            product.setProductType(request.getSelectedType());
            product.setUpdatedAt(LocalDateTime.now());

            productRepository.save(product);

            List<Category> existingCategories = categoryRepository.findByProduct_Asin(request.getAsin());
            categoryRepository.deleteAll(existingCategories);

            if (request.getCategoryList() != null && !request.getCategoryList().isEmpty()) {
                String jsonCategories = objectMapper.writeValueAsString(request.getCategoryList());

                Category category = new Category();
                category.setCategories(jsonCategories); // field kiểu String JSON
                category.setProduct(product);
                category.setDescription(request.getDescription());
                categoryRepository.save(category);
            }
            Optional<Product> product1 = productRepository.findProductByAsin(product.getAsin());
            ProductDto productDto = new ProductDto();
            productDto.setProductId(product.getProductId());
            productDto.setAsin(product.getAsin() != null ? product.getAsin() : "");
            productDto.setProductTitle(product.getProductTitle() != null ? product.getProductTitle() : "");
            productDto.setProductPrice(product.getProductPrice() != null ? product.getProductPrice() : BigDecimal.ZERO);
            productDto.setProductThumbnail(product.getProductThumbnail() != null ? product.getProductThumbnail() : "");
            productDto.setSalesRank(product.getSalesRank());
            productDto.setProductType(product.getProductType() != null ? product.getProductType() : "");
            productDto.setStoreId(product.getStoreId());
            productDto.setPercentDiscount(product.getPercentDiscount() != null ? product.getPercentDiscount() : 0);
            productDto.setStockQuantity(product.getStockQuantity() != null ? product.getStockQuantity() : 0);
            productDto.setTags(product.getTags());
            productDto.setProductStatus(product.getProductStatus() != null ? String.valueOf(product.getProductStatus()) : "UNKNOWN");
            String message = searchServiceProxy.updateProduct(productDto);

            return ResponseEntity.ok(Map.of("message", "✅ Cập nhật sản phẩm thành công" + message) );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("message", "❌ Lỗi khi cập nhật sản phẩm: " + e.getMessage()));
        }
    }

    @Override
    public Optional<ProductResponse> getProductDetail(String asin, Long authId) {
        Optional<Product> productByAsin = productRepository.findProductByAsin(asin);

        if (productByAsin.isEmpty()) {
            throw new RuntimeException("❌ Không tìm thấy sản phẩm với ASIN: " + asin);
        }
        validateShopOwnership(productByAsin.get().getStoreId(), authId);


        Product product = productByAsin.get();
        ProductResponse response = new ProductResponse();
        response.setProductId(product.getProductId());
        response.setAsin(product.getAsin());
        response.setNameProduct(product.getProductTitle());
        response.setNameBrand(product.getBrandName());
        response.setPrice(product.getProductPrice().doubleValue());
        response.setProductStatus(product.getProductStatus().name());
        response.setSelectedType(product.getProductType());
        response.setSelectedGender(product.getTags());
        response.setDiscountPercent(product.getPercentDiscount().intValue());
        response.setThumbnail(product.getProductThumbnail());
        System.out.println("colorAsin JSON: " + product.getColorAsin());
        response.setSelectedCategory(product.getSalesRank());

        // Parse selected colors from JSON
        try {
            List<ColorDTO> selectedColors = objectMapper.readValue(
                    product.getColorAsin(), new TypeReference<List<ColorDTO>>() {
                    }
            );
            response.setSelectedColors(selectedColors);
        } catch (Exception e) {
            response.setSelectedColors(Collections.emptyList());
        }

        Optional<Category> category = categoryRepository.findByProduct(product);
        if (category.isPresent()) {
            try {
                List<List<String>> categoryList = objectMapper.readValue(
                        category.get().getCategories(), new TypeReference<List<List<String>>>() {
                        }
                );
                response.setCategoryList(categoryList);
                response.setDescription(category.get().getDescription());


            } catch (Exception e) {
                response.setCategoryList(Collections.emptyList());
            }
        }

        List<ProductSize> sizes = productSizeRepository.findAllByProduct(product);
        response.setSize(sizes);

        List<ProductImage> images = productImageRepository.findByProduct(product);

        Map<Long, List<ImageInfoDTO>> colorIdToImages = new HashMap<>();

        for (ProductImage img : images) {
            ImageInfoDTO imageInfo = new ImageInfoDTO();
            imageInfo.setImageUrl(img.getImageData());
            imageInfo.setIsMainImage(img.getIsMainImage());
            imageInfo.setImage_id(img.getImageId());

            colorIdToImages
                    .computeIfAbsent(img.getColorId(), k -> new ArrayList<>())
                    .add(imageInfo);
        }

// Chuyển thành danh sách ImageDTO
        List<ImageDTO> imageDTOs = colorIdToImages.entrySet().stream()
                .map(entry -> {
                    ImageDTO dto = new ImageDTO();
                    dto.setIdColor(entry.getKey());
                    dto.setListImageByColor(entry.getValue());
                    return dto;
                })
                .collect(Collectors.toList());

        response.setListColorAndThumbnail(imageDTOs);


        return Optional.of(response);
    }
    @Override
    public Optional<ProductResponse> getProductDetailAdmin(String asin) {
        Optional<Product> productByAsin = productRepository.findProductByAsin(asin);

        if (productByAsin.isEmpty()) {
            throw new RuntimeException("❌ Không tìm thấy sản phẩm với ASIN: " + asin);
        }


        Product product = productByAsin.get();
        ProductResponse response = new ProductResponse();
        response.setProductId(product.getProductId());
        response.setAsin(product.getAsin());
        response.setNameProduct(product.getProductTitle());
        response.setNameBrand(product.getBrandName());
        response.setPrice(product.getProductPrice().doubleValue());
        response.setProductStatus(product.getProductStatus().name());
        response.setSelectedType(product.getProductType());
        response.setSelectedGender(product.getTags());
        response.setDiscountPercent(product.getPercentDiscount().intValue());
        response.setThumbnail(product.getProductThumbnail());
        System.out.println("colorAsin JSON: " + product.getColorAsin());
        response.setSelectedCategory(product.getSalesRank());

        // Parse selected colors from JSON
        try {
            List<ColorDTO> selectedColors = objectMapper.readValue(
                    product.getColorAsin(), new TypeReference<List<ColorDTO>>() {
                    }
            );
            response.setSelectedColors(selectedColors);
        } catch (Exception e) {
            response.setSelectedColors(Collections.emptyList());
        }

        Optional<Category> category = categoryRepository.findByProduct(product);
        if (category.isPresent()) {
            try {
                List<List<String>> categoryList = objectMapper.readValue(
                        category.get().getCategories(), new TypeReference<List<List<String>>>() {
                        }
                );
                response.setCategoryList(categoryList);
                response.setDescription(category.get().getDescription());


            } catch (Exception e) {
                response.setCategoryList(Collections.emptyList());
            }
        }

        List<ProductSize> sizes = productSizeRepository.findAllByProduct(product);
        response.setSize(sizes);

        List<ProductImage> images = productImageRepository.findByProduct(product);

        Map<Long, List<ImageInfoDTO>> colorIdToImages = new HashMap<>();

        for (ProductImage img : images) {
            ImageInfoDTO imageInfo = new ImageInfoDTO();
            imageInfo.setImageUrl(img.getImageData());
            imageInfo.setIsMainImage(img.getIsMainImage());
            imageInfo.setImage_id(img.getImageId());

            colorIdToImages
                    .computeIfAbsent(img.getColorId(), k -> new ArrayList<>())
                    .add(imageInfo);
        }

// Chuyển thành danh sách ImageDTO
        List<ImageDTO> imageDTOs = colorIdToImages.entrySet().stream()
                .map(entry -> {
                    ImageDTO dto = new ImageDTO();
                    dto.setIdColor(entry.getKey());
                    dto.setListImageByColor(entry.getValue());
                    return dto;
                })
                .collect(Collectors.toList());

        response.setListColorAndThumbnail(imageDTOs);


        return Optional.of(response);
    }

    @Override
    public ResponseEntity<?> addSize(SizeRequest request, Long authId) {
        Optional<Product> optionalProduct = productRepository.findProductByAsin(request.getAsin());

        if (optionalProduct.isEmpty()) {
            throw new RuntimeException("❌ Không tìm thấy sản phẩm với ASIN: " + request.getAsin());
        }
        validateShopOwnership(optionalProduct.get().getStoreId(), authId);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Không tìm thấy sản phẩm với ASIN: " + request.getAsin());
        }
        Product product = optionalProduct.get();
        List<ProductSize> sizeEntities = request.getSizes().stream()
                .map(size -> {
                    ProductSize s = new ProductSize();
                    s.setProduct(product);
                    s.setSizeName(size.trim());
                    return s;
                })
                .collect(Collectors.toList());

        productSizeRepository.saveAll(sizeEntities);
        return ResponseEntity.ok(Map.of("message","✅ Đã thêm " + sizeEntities.size() + " size cho sản phẩm."));
    }

    @Override
    public void deleteSize(Long sizeId, Long authId) {
        Optional<ProductSize> sizeOpt = sizeRepository.findById(sizeId);
        if (sizeOpt.isEmpty()) {
            throw new RuntimeException("Size không tồn tại");
        }
        Product product = sizeOpt.get().getProduct();
        validateShopOwnership(product.getStoreId(), authId);


        sizeRepository.deleteById(sizeId);
    }
    @Override
    public void updateImage(MultipartFile file, Long imageId, Long authId) {
        // 1. Kiểm tra imageId có tồn tại
        ProductImage productImage = productImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("❌ Không tìm thấy ảnh với ID: " + imageId));

        // 2. Lấy sản phẩm từ ảnh
        Product product = productImage.getProduct();

        validateShopOwnership(product.getStoreId(), authId);


        try {
            byte[] fileBytes = file.getBytes();
            String originalFilename = file.getOriginalFilename();
            asyncUploadService.editImage(fileBytes, originalFilename, imageId);
        } catch (IOException e) {
            throw new RuntimeException("❌ Lỗi khi đọc file upload: " + e.getMessage(), e);
        }
    }

    @Override
    public void saveImageForColor(String asin, Long colorId, MultipartFile file, Long authId) {
        Product product = productRepository.findProductByAsin(asin)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ASIN: " + asin));
        validateShopOwnership(product.getStoreId(), authId);

        String filename = file.getOriginalFilename(); // hoặc tự generate tên
        ProductImage image = new ProductImage();
        image.setProduct(product);
        image.setImageData(filename); // hoặc là đường dẫn upload
        image.setIsMainImage(0); // mặc định không phải ảnh chính
        image.setColorId(colorId);
        image.setCreatedAt(LocalDateTime.now());
        image.setUpdatedAt(LocalDateTime.now());
        productImageRepository.save(image);

    }
    @Override
    @Transactional
    public void setThumbnail(String asin, Long imageId, Long authId) {
        Product product = productRepository.findProductByAsin(asin)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ASIN: " + asin));
        validateShopOwnership(product.getStoreId(), authId);
        productImageRepository.resetMainImageByAsin(asin);
        productImageRepository.setMainImage(imageId);
        Optional<ProductImage> productImage = productImageRepository.findById(imageId);
        product.setProductThumbnail(productImage.get().getImageData());
        productRepository.save(product);
        Map<Long, String> thumbnailData = Map.of(product.getProductId(), productImage.get().getImageData());
        try {
            searchServiceProxy.updateProductThumbnail(thumbnailData);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    private String generateRandomAsin(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder asin = new StringBuilder();
        Random random = new SecureRandom();
        for (int i = 0; i < length; i++) {
            asin.append(characters.charAt(random.nextInt(characters.length())));
        }
        return asin.toString();
    }
    @Override
    public void deleteImageById(Long imageId, Long authId) {
        ProductImage productImage = productImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("❌ Không tìm thấy ảnh với ID: " + imageId));

        // 2. Lấy sản phẩm từ ảnh
        Product product = productImage.getProduct();

        validateShopOwnership(product.getStoreId(), authId);


        productImageRepository.deleteById(imageId);
    }

    @Transactional
    @Override
    public ResponseEntity<?> deleteProductByAsin(String asin, Long authId) {
        Product product = productRepository.findProductByAsin(asin)
                .orElseThrow(() -> new RuntimeException("❌ Không tìm thấy sản phẩm với ASIN: " + asin));
        validateShopOwnership(product.getStoreId(), authId);
        product.setProductStatus(ProductStatus.deleted);
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product); // 🔥 Save + flush
        log.info("🔎 DB Check: {}", productRepository.findProductByAsin(asin).get().getProductStatus());

        log.info("🔄 Product {} status updated to {}", asin, product.getProductStatus());

        return ResponseEntity.ok(Map.of("message", "✅ Đã xoá sản phẩm (mềm) thành công."));
    }

    @Transactional
    @Override
    public ResponseEntity<?> deleteProductByAsinAdmin(String asin) {
        Product product = productRepository.findProductByAsin(asin)
                .orElseThrow(() -> new RuntimeException("❌ Không tìm thấy sản phẩm với ASIN: " + asin));


        product.setProductStatus(ProductStatus.deleted);
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product); // 🔥 Save + flush
        log.info("🔎 DB Check: {}", productRepository.findProductByAsin(asin).get().getProductStatus());

        log.info("🔄 Product {} status updated to {}", asin, product.getProductStatus());

        return ResponseEntity.ok(Map.of("message", "✅ Đã xoá sản phẩm (mềm) thành công."));
    }


    @Override
    public List<ProductResponse> getProductsByStoreId(Long storeId) {
        List<Product> products = productRepository.findByStoreId(storeId);
        return products.stream()
                .map(this::mapProductToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void updateStatus(Long productId, String status) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            product.setProductStatus(ProductStatus.valueOf(status));
            productRepository.save(product);
        }
    }


    private void validateShopOwnership(Long storeId, Long authId) {
        Object body = sellerServiceProxy.getAuthIdByStore(storeId).getBody();
        Long storeOwnerAuth = (body instanceof Integer)
                ? ((Integer) body).longValue()
                : (Long) body;
        if (!authId.equals(storeOwnerAuth)) {
            throw new RuntimeException("❌ Bạn không có quyền thao tác với shop này");
        }
    }
    @Override
    public List<ProductResponse> getProductsByStoreId(Long storeId, Long authId) {
        validateShopOwnership(storeId, authId); // Kiểm tra quyền truy cập

        List<Product> products = productRepository.findByStoreId(storeId);
        return products.stream()
                .map(this::mapProductToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void updateStatus(Long productId, String status, Long authId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại"));

        Long storeId = product.getStoreId();
        validateShopOwnership(storeId, authId); // Xác thực người sở hữu

        product.setProductStatus(ProductStatus.valueOf(status));
        productRepository.save(product);
    }


    @Override
    public Optional<Long> getStoreIdByProductId(Long productId) {
        return productRepository.findStoreIdByProductId(productId);
    }

    @Override
    public List<Long> getProductIdsByStore(Long storeId) {
        return productRepository.findProductIdsByStoreId(storeId);
    }

    @Override
    public Optional<String> findProductNameById(Long productId) {
        return productRepository.findProductNameById(productId);
    }

    @Override
    public ProductResponse getProductById(Long idProduct) {
        ProductResponse  productResponse = new ProductResponse();
        Optional<Product> productOpt = productRepository.findById(idProduct);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            productResponse.setAsin(product.getAsin());
            productResponse.setNameProduct(product.getProductTitle());
            productResponse.setThumbnail(product.getProductThumbnail());
            return productResponse;
        }
        return null;
    }

    public ProductResponse mapProductToDTO(Product product) {
        ProductResponse dto = new ProductResponse();
        dto.setProductId(product.getProductId());
        dto.setAsin(product.getAsin());
        dto.setNameProduct(product.getProductTitle());
        dto.setNameBrand(product.getBrandName());
        dto.setPrice(product.getProductPrice() != null ? product.getProductPrice().doubleValue() : null);
        dto.setProductStatus(product.getProductStatus() != null ? product.getProductStatus().name() : null);
        dto.setSelectedType(product.getProductType());
        dto.setDiscountPercent(product.getPercentDiscount() != null ? product.getPercentDiscount().intValue() : 0);
        dto.setDescription(product.getTags());
        dto.setThumbnail(product.getProductThumbnail());
        dto.setSalesRank(product.getSalesRank());
        dto.setSize(product.getSizes());
        dto.setStoreId(product.getStoreId());
        // Category list
        if (product.getCategory() != null) {
            List<List<String>> categoryList = new ArrayList<>();
            for (Category c : product.getCategory()) {
                if (c.getCategories() != null) {
                    categoryList.add(List.of(c.getCategories()));
                }
            }
            dto.setCategoryList(categoryList);
        }

        // === Map selectedColors ===
        Set<Long> addedColorIds = new HashSet<>();
        List<ColorDTO> selectedColors = new ArrayList<>();

        if (product.getImages() != null) {
            for (ProductImage img : product.getImages()) {
                Long colorId = img.getColorId();
                if (colorId != null && !addedColorIds.contains(colorId)) {
                    colorRepository.findById(colorId).ifPresent(color -> {
                        selectedColors.add(new ColorDTO(color));
                        addedColorIds.add(colorId);
                    });
                }
            }
        }
        dto.setSelectedColors(selectedColors);

        Map<Long, List<ImageInfoDTO>> imageMap = new HashMap<>();

        for (ProductImage image : product.getImages()) {
            Long colorId = image.getColorId();
            if (colorId == null) continue;

            imageMap.putIfAbsent(colorId, new ArrayList<>());

            ImageInfoDTO imageInfo = new ImageInfoDTO();
            imageInfo.setImageUrl(image.getImageData()); // tên ảnh hoặc URL
            imageInfo.setImage_id(image.getImageId());
            imageInfo.setIsMainImage(image.getIsMainImage());

            imageMap.get(colorId).add(imageInfo);
        }

        List<ImageDTO> imageDTOList = new ArrayList<>();
        for (Map.Entry<Long, List<ImageInfoDTO>> entry : imageMap.entrySet()) {
            ImageDTO imageDTO = new ImageDTO();
            imageDTO.setIdColor(entry.getKey());
            imageDTO.setListImageByColor(entry.getValue());
            imageDTOList.add(imageDTO);
        }
        dto.setListColorAndThumbnail(imageDTOList);

        return dto;
    }
    @Override
    public Long getTotalProductCount() {
        return productRepository.count();
    }

    @Override
    public List<ProductStatsDTO> getProductCountByStatus() {
        List<Object[]> rawResult = productRepository.countProductsByProductStatus();
        return rawResult.stream()
                .map(obj -> new ProductStatsDTO(String.valueOf(obj[0]), (Long) obj[1]))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductStatsDTO> getProductCountByType() {
        List<Object[]> rawResult = productRepository.countProductsByProductType();
        return rawResult.stream()
                .map(obj -> new ProductStatsDTO(String.valueOf(obj[0]), (Long) obj[1]))
                .collect(Collectors.toList());
    }
    @Override
    public List<ProductStatsDTO> getProductCountByStore() {
        List<Object[]> rawResult = productRepository.countProductsByStoreId();
        return rawResult.stream()
                .map(obj -> new ProductStatsDTO("Store ID " + obj[0], (Long) obj[1]))
                .collect(Collectors.toList());
    }
    @Override
    public List<ProductStatsDTO> getProductCountByCreatedMonth() {
        List<Object[]> rawResult = productRepository.countProductsByCreatedMonth();
        return rawResult.stream()
                .map(obj -> {
                    int monthNumber = ((Number) obj[0]).intValue();
                    String monthLabel = "Tháng " + monthNumber;
                    return new ProductStatsDTO(monthLabel, (Long) obj[1]);
                })
                .collect(Collectors.toList());
    }

    @Override
    public String evaluateByUserWithItemOrder(String comment, Long orderItemId, List<MultipartFile> files, String productAsin, int rating) {

        return "";
    }

    @Override
    public EvaluateResponse getEvaluateResponseByOrderItemId(Long orderItemId) {
        Optional<EvaluateProduct> evaluateProduct = evaluateProductRepository.findByOrderItemId(orderItemId);
        if (evaluateProduct.isPresent()) {
            EvaluateResponse evaluateResponse = new EvaluateResponse();
            evaluateResponse.setEvaluteId(evaluateProduct.get().getEvaluteId());
            evaluateResponse.setCommentByEvaluate(evaluateProduct.get().getCommentByEvaluate());
            evaluateResponse.setComment(evaluateProduct.get().getComment());
            evaluateResponse.setCreatedAt(evaluateProduct.get().getCreatedAt());
            evaluateResponse.setImgEvaluate(evaluateProduct.get().getImgEvaluate());
            evaluateResponse.setProductAsin(evaluateProduct.get().getProductAsin());
            evaluateResponse.setRating(evaluateProduct.get().getRating());
            evaluateResponse.setOrder_item_id(evaluateProduct.get().getOrderItemId());
            evaluateResponse.setStatus(evaluateProduct.get().getStatus());
            return evaluateResponse;
        }
        return null;
    }

    @Override
    public String updateCommentVyEvaluate(Long idEvaluate, String commentBySeller) {
        EvaluateProduct evaluateProduct = evaluateProductRepository.findById(idEvaluate).get();
        evaluateProduct.setCommentByEvaluate(commentBySeller);
        evaluateProduct.setStatus(1);
        evaluateProductRepository.save(evaluateProduct);
        return "Phản hồi đánh giá thành công";
    }

    @Override
    public String actionStatusEvaluate(Long idEvaluate, int status) {
        EvaluateProduct evaluateProduct = evaluateProductRepository.findById(idEvaluate).get();
        evaluateProduct.setStatus(status);
        evaluateProductRepository.save(evaluateProduct);
        return "Đã chỉnh sửa trạng thái thành công ";
    }

    @Override
    public List<EvaluateResponse> getEvaluateByProductAsin(String asin) {
        List<EvaluateProduct> evaluateProduct = evaluateProductRepository.findByProductAsin(asin);
        return evaluateProduct.stream().map(e -> modelMapper.map(e, EvaluateResponse.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<ProductResponse> getTopDiscounted(int size, ProductStatus status) {
        int n = Math.max(1, size);
        Page<Product> page = productRepository.findTopDiscounted(status, PageRequest.of(0, n));
        return page.getContent().stream()
                .map(this::mapProductToDTO) // hàm map bạn đã có
                .toList();
    }
    @Override
    public Page<ProductResponse> searchProductsByStore(Long storeId, StoreProductFilter filter, Pageable pageable) {
        Sort s = ProductSpecs.sortOf(filter != null ? filter.sort() : null);
        Pageable pz = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), s);

        Page<Product> page = productRepository.findAll(ProductSpecs.byStoreAndFilter(storeId, filter), pz);
        return page.map(this::mapProductToDTO);
    }

    @Override
    public List<CategoryCountDTO> getProductTypeCountByStore(Long storeId) {
        return productRepository.countProductTypeByStore(storeId);
    }

    @Override
    public List<CategoryCountDTO> getSalesRankCountByStore(Long storeId) {
        return productRepository.countSalesRankByStore(storeId);
    }

    @Override
    public List<CategoryCountDTO> getTagCountByStore(Long storeId) {
        return productRepository.countTagsByStore(storeId);
    }

    @Override
    public long countDiscountingProductsByStore(Long storeId) {
        return productRepository.countDiscountingByStore(storeId);
    }
}