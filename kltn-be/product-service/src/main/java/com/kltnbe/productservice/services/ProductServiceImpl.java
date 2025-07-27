// ServiceImpl: ProductServiceImpl.java
package com.kltnbe.productservice.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kltnbe.productservice.clients.SellerServiceProxy;
import com.kltnbe.productservice.dtos.ColorDTO;
import com.kltnbe.productservice.dtos.req.*;
import com.kltnbe.productservice.dtos.res.ProductResponse;
import com.kltnbe.productservice.entities.*;
import com.kltnbe.productservice.enums.ProductStatus;
import com.kltnbe.productservice.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    @Autowired
    private ObjectMapper objectMapper; // từ Jackson
    @Autowired
    private ProductVariantRepository productVariantRepository;
    private final AsyncUploadService asyncUploadService;
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

    @Override
    public ResponseEntity<?> createProduct(ProductRequestDTO request) {
        String asin = generateRandomAsin(10);
        Long idShop = sellerServiceProxy.getIdShopByAccessToken(request.getAccessToken()).getBody();

        if (idShop == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "❌ Thất bại: Chưa có shop"));
        }

        try {
            List<Color> colors = colorRepository.findByNameColorIn(request.getSelectedColors());
            List<ColorDTO> colorDTOs = colors.stream()
                    .map(ColorDTO::new)
                    .collect(Collectors.toList());

            String json = objectMapper.writeValueAsString(colorDTOs);

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
            productRepository.save(product);

            if (request.getCategoryList() != null && !request.getCategoryList().isEmpty()) {
                String jsonCategories = objectMapper.writeValueAsString(request.getCategoryList());

                Category category = new Category();
                category.setCategories(jsonCategories); // field kiểu String JSON
                category.setProduct(product);
                category.setDescription(request.getDescription());
                categoryRepository.save(category);
            }

            return ResponseEntity.ok(Map.of("message", "✅ Thêm sản phẩm thành công. Mã ASIN: " + asin));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("message", "❌ Lỗi server: " + e.getMessage()));
        }
    }
    public ResponseEntity<?> updateProduct(ProductRequestDTO request) {
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


            return ResponseEntity.ok(Map.of("message", "✅ Cập nhật sản phẩm thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("message", "❌ Lỗi khi cập nhật sản phẩm: " + e.getMessage()));
        }
    }

    @Override
    public Optional<ProductResponse> getProductDetail(String asin) {
        Optional<Product> productOpt = productRepository.findProductByAsin(asin);
        if (productOpt.isEmpty()) return Optional.empty();

        Product product = productOpt.get();
        ProductResponse response = new ProductResponse();

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
    public ResponseEntity<?> addSize(SizeRequest request) {
        Optional<Product> optionalProduct = productRepository.findProductByAsin(request.getAsin());
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
        return ResponseEntity.ok("✅ Đã thêm " + sizeEntities.size() + " size cho sản phẩm.");
    }

    @Override
    public void deleteSize(Long sizeId) {
        Optional<ProductSize> sizeOpt = sizeRepository.findById(sizeId);
        if (sizeOpt.isEmpty()) {
            throw new RuntimeException("Size không tồn tại");
        }
        sizeRepository.deleteById(sizeId);
    }
    @Override
    public void updateImage(MultipartFile file, Long imageId) {
        try {
            byte[] fileBytes = file.getBytes();
            String originalFilename = file.getOriginalFilename();
            asyncUploadService.editImage(fileBytes, originalFilename, imageId);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void saveImageForColor(String asin, Long colorId, MultipartFile file) {
        Product product = productRepository.findProductByAsin(asin)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ASIN: " + asin));
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
    public void setThumbnail(String asin, Long imageId) {
        productImageRepository.resetMainImageByAsin(asin);
        productImageRepository.setMainImage(imageId);
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
    public void deleteImageById(Long imageId) {
        if (!productImageRepository.existsById(imageId)) {
            throw new NoSuchElementException("❌ Không tìm thấy ảnh với ID: " + imageId);
        }
        productImageRepository.deleteById(imageId);
    }
    @Override
    public ResponseEntity<?> deleteProductByAsin(String asin) {
        try {
            Product product = productRepository.findProductByAsin(asin)
                    .orElseThrow(() -> new RuntimeException("❌ Không tìm thấy sản phẩm với ASIN: " + asin));

            product.setProductStatus(ProductStatus.deleted);
            product.setUpdatedAt(LocalDateTime.now());
            productRepository.save(product);

            return ResponseEntity.ok(Map.of("message", "✅ Đã xoá sản phẩm (mềm) thành công."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("message", "❌ Lỗi khi xoá sản phẩm: " + e.getMessage()));
        }
    }


}