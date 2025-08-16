package com.kltnbe.productservice.controllers;


import com.kltnbe.productservice.clients.OrderServiceProxy;
import com.kltnbe.productservice.clients.SellerServiceProxy;
import com.kltnbe.productservice.clients.UploadServiceProxy;
import com.kltnbe.productservice.dtos.*;
import com.kltnbe.productservice.dtos.req.*;
import com.kltnbe.productservice.dtos.res.*;
import com.kltnbe.productservice.entities.*;
import com.kltnbe.productservice.enums.ProductStatus;
import com.kltnbe.productservice.repositories.*;
import com.kltnbe.productservice.services.AsyncUploadService;
import com.kltnbe.productservice.services.ProductService;
import com.kltnbe.productservice.services.ProductVariantService;
import com.kltnbe.security.utils.InternalApi;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;


@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ProductVariantService productVariantService;
    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Autowired
    private ProductVariantRepository productVariantRepository;
    @Autowired
    private ProductImageRepository productImageRepository;
    private final AsyncUploadService  asyncUploadService;
    private final UploadServiceProxy  uploadServiceProxy;
    private final SellerServiceProxy sellerServiceProxy;
    private final EvaluateProductRepository evaluateProductRepository;
    @Autowired
    private OrderServiceProxy orderServiceProxy;

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
    @PostMapping("/listByIds")
    public ResponseEntity<List<Product>> getProductsByIds(@RequestBody List<Long> ids) {
        List<Product> products = productService.getProductsByIds(ids);
        return ResponseEntity.ok(products);
    }
    @GetMapping("/color-id")
    public Long getColorIdByName(@RequestParam("nameColor") String nameColor) {
        return colorRepository.findByNameColor(nameColor)
                .map(Color::getColorId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy màu: " + nameColor));
    }
    @GetMapping("/size-id")
    public Long getSizeIdByName(@RequestParam("sizeName") String sizeName) {
        return productSizeRepository.findBySizeName(sizeName)
                .map(ProductSize::getSizeId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy size: " + sizeName));
    }
    @GetMapping("/color-name")
    public ResponseEntity<String> getColorNameById(@RequestParam("id") Long colorId) {
        return colorRepository.findById(colorId)
                .map(color -> ResponseEntity.ok(color.getNameColor()))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Không tìm thấy màu với ID: " + colorId));
    }
    @PostMapping("/reduce-inventory")
    public ResponseEntity<?> reduceInventory(@RequestBody List<InventoryReduceRequest> requests) {
        for (InventoryReduceRequest req : requests) {
            Optional<ProductVariant> variantOpt;

            // Lựa chọn query phù hợp theo từng trường hợp
            if (req.getSizeId() != null && req.getColorId() != null) {
                variantOpt = productVariantRepository.findByProductIdAndSizeIdAndColorId(
                        req.getProductId(), req.getSizeId(), req.getColorId());
            } else if (req.getSizeId() != null) {
                variantOpt = productVariantRepository.findByProductIdAndSizeIdAndColorNull(
                        req.getProductId(), req.getSizeId());
            } else if (req.getColorId() != null) {
                variantOpt = productVariantRepository.findByProductIdAndSizeNullAndColorId(
                        req.getProductId(), req.getColorId());
            } else {
                variantOpt = productVariantRepository.findByProductIdAndSizeNullAndColorNull(
                        req.getProductId());
            }

            if (variantOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm phù hợp (productId: "
                        + req.getProductId() + ")");
            }

            ProductVariant variant = variantOpt.get();

            if (variant.getQuantityInStock() < req.getQuantity()) {
                return ResponseEntity.badRequest().body("Sản phẩm " + req.getProductId() + " không đủ tồn kho");
            }

            variant.setQuantityInStock(variant.getQuantityInStock() - req.getQuantity());
            variant.setQuantitySold(variant.getQuantitySold() + req.getQuantity());
            productVariantRepository.save(variant);
        }

        return ResponseEntity.ok("Đã trừ tồn kho");
    }
    @PostMapping("/restore-inventory")
    public ResponseEntity<?> restoreInventory(@RequestBody List<InventoryRestoreRequest> requests) {
        try {
            productVariantService.restoreInventoryFromNames(requests);
            return ResponseEntity.ok("✅ Đã hoàn tồn kho thành công");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Lỗi khi hoàn tồn kho: " + e.getMessage());
        }
    }

    @GetMapping("/findMoreProductInfoById")
    public ResponseEntity<MoreProductInfo> findMoreProductInfoById() {
        MoreProductInfo moreProductInfo = productService.findMoreProductInfoById(1L);
        return ResponseEntity.ok(moreProductInfo);
    }
    @GetMapping("/getAllColorStatus1")
    public ResponseEntity<List<Color>> getAllColorStatus1() {
        List<Color> colors = colorRepository.findAll();
        return ResponseEntity.ok(colors);
    }
    @InternalApi
    @PostMapping("/internal/addProduct")
        public ResponseEntity<?> addProduct(@RequestBody ProductRequestDTO productRequestDTO, @RequestParam Long authId) {
            return ResponseEntity.ok(productService.createProduct(productRequestDTO, authId));
        }
    @InternalApi
    @GetMapping("/internal/productByAsin/{asin}")
    public ResponseEntity<?> findProductByAsin(@PathVariable String asin,@RequestParam Long  authId) {
        return productService.getProductDetail(asin, authId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @InternalApi
    @GetMapping("/internal/productByAsinAdmin/{asin}")
    public ResponseEntity<?> findProductByAsinAdmin(@PathVariable String asin) {
        return productService.getProductDetailAdmin(asin)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @InternalApi
    @PostMapping("/internal/addSize")
    public ResponseEntity<?> addSize(@RequestBody SizeRequest request,@RequestParam Long  authId) {
        return productService.addSize(request, authId);
    }

    @InternalApi
    @DeleteMapping("/internal/deleteSize")
    public ResponseEntity<?> deleteSize(@RequestParam Long sizeId,@RequestParam Long  authId) {
        try {
            productService.deleteSize(sizeId, authId);
            return ResponseEntity.ok(Map.of("message", "✅ Xóa size thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "❌ Lỗi khi xóa size: " + e.getMessage()));
        }
    }
    @InternalApi
    @PostMapping(value = "/internal/upload-images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImagesAsync(
            @RequestParam("asin") String asin,
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("colorIds") List<Long> colorIds, @RequestParam Long authId) {
        if (files.size() != colorIds.size()) {
            return ResponseEntity.badRequest().body("❌ Số lượng ảnh và colorId không khớp!");
        }
        Optional<Product> productOpt = productRepository.findProductByAsin(asin);
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Không tìm thấy sản phẩm.");
        }
        Product product = productOpt.get();
        Object body = sellerServiceProxy.getAuthIdByStore(product.getStoreId()).getBody();
        Long storeOwnerAuth = (body instanceof Integer)
                ? ((Integer) body).longValue()
                : (Long) body;
        if (!authId.equals(storeOwnerAuth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("❌ Bạn không có quyền upload ảnh cho sản phẩm này");
        }

        for (int i = 0; i < files.size(); i++) {
            try {
                MultipartFile file = files.get(i);
                Long colorId = colorIds.get(i);

                byte[] fileBytes = file.getBytes();
                String filename = file.getOriginalFilename();

                asyncUploadService.uploadAndSaveImage(
                        product, fileBytes, filename, colorId,
                        uploadServiceProxy, productImageRepository
                );
            } catch (IOException e) {
                System.err.println("❌ Không đọc được file ảnh: " + e.getMessage());
            }
        }

        return ResponseEntity.ok(Map.of("message", "✅ Ảnh đang được xử lý và lưu nền."));
    }
    @PostMapping(value = "/uploadImgToProductEvaluate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImgToProductEvaluate(
            @RequestPart("data") EvalueUserWithItemOrder req,
            @RequestPart("files") List<MultipartFile> files) {

        // ✅ 1 order item chỉ tạo 1 evaluate
        if (evaluateProductRepository.existsByOrderItemId(req.getOrderItemId())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Order item này đã được đánh giá."));
        }

        EvaluateProduct ev = new EvaluateProduct();
        ev.setOrderItemId(req.getOrderItemId());
        ev.setProductAsin(req.getProductAsin());
        ev.setComment(req.getComment());
        ev.setRating(req.getRating());
        ev.setStatus(0); // PENDING để chờ seller duyệt
        try { ev.setCreatedAt(LocalDateTime.now()); } catch (Exception ignore) {}

        ev = evaluateProductRepository.save(ev);

        // Giữ nguyên các callback sang OrderService của bạn
        orderServiceProxy.updateStatusEvaluate(ev.getOrderItemId());
        orderServiceProxy.updateEvaluateNumber(req.getOrderItemId(), req.getRating());

        // Đọc bytes trước rồi upload async (giữ nguyên)
        List<byte[]> fileBytesList = new ArrayList<>();
        List<String> filenames = new ArrayList<>();
        for (MultipartFile f : files) {
            try {
                fileBytesList.add(f.getBytes());
                filenames.add(f.getOriginalFilename());
            } catch (IOException e) {
                return ResponseEntity.badRequest().body(Map.of("error", "Lỗi đọc file: " + e.getMessage()));
            }
        }
        asyncUploadService.uploadAndAppendImageUrls(ev, fileBytesList, filenames);

        return ResponseEntity.ok(Map.of("message", "Đã nhận đánh giá, chờ duyệt!"));
    }

    @InternalApi
    @PutMapping(value = "/internal/update-image/{imageId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateImage(
            @RequestParam("file") MultipartFile file,
            @PathVariable Long imageId, @RequestParam Long authId
    ) {
        productService.updateImage(file, imageId, authId);
        return ResponseEntity.accepted().body("Đang xử lý upload ảnh...");
    }
    @InternalApi
    @PutMapping("/internal/updateProduct")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequestDTO request,@RequestParam Long  authId) {
        return productService.updateProduct(request, authId);
    }
    @InternalApi
    @PutMapping("/internal/set-thumbnail")
    public ResponseEntity<?> setThumbnail(
            @RequestParam String asin,
            @RequestParam Long imageId,
            @RequestParam Long authId
    ) {
        productService.setThumbnail(asin, imageId, authId);
        return ResponseEntity.ok(Map.of("message", "✅ Cập nhật thumbnail thành công!"));
    }
    @InternalApi
    @DeleteMapping("/internal/deleteImage/{imageId}")
    public ResponseEntity<String> deleteImage(@PathVariable Long imageId,@RequestParam Long  authId) {
        try {
            productService.deleteImageById(imageId, authId);
            return ResponseEntity.ok("✅ Xoá ảnh thành công.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Lỗi khi xoá ảnh: " + e.getMessage());
        }
    }
    @InternalApi
    @PutMapping("/internal/deleteProduct/{asin}")
    public ResponseEntity<?> deleteProduct(@PathVariable String asin,@RequestParam Long authId) {
        return productService.deleteProductByAsin(asin, authId);
    }
    @InternalApi
    @PutMapping("/internal/deleteProductAdmin/{asin}")
    public ResponseEntity<?> deleteProductAdmin(@PathVariable String asin) {
        return productService.deleteProductByAsinAdmin(asin);
    }
    @GetMapping("/by-seller/{storeId}")
    public ResponseEntity<List<ProductResponse>> getProductsBySeller(
            @PathVariable Long storeId,
            @RequestParam Long authId
    ) {
        return ResponseEntity.ok(productService.getProductsByStoreId(storeId, authId));
    }
    @GetMapping("/by-seller/{storeId}/paged")
    public ResponseEntity<Map<String, Object>> getProductsBySellerPaged(
            @PathVariable Long storeId,
            @RequestParam Long authId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<ProductResponse> result = productService.getProductsByStoreId(storeId, authId, pageable);

        Map<String, Object> body = new HashMap<>();
        body.put("content", result.getContent());
        body.put("totalPages", result.getTotalPages());
        body.put("totalElements", result.getTotalElements());
        return ResponseEntity.ok(body);
    }
    @PutMapping("/{productId}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long productId,
            @RequestParam String status,@RequestParam Long authId

    ) {
        productService.updateStatus(productId, status, authId);
        return ResponseEntity.ok("Trạng thái sản phẩm đã được cập nhật");
    }
    @GetMapping("/colors")
    public ResponseEntity<List<Color>> getAllActiveColors() {
        List<Color> colors = colorRepository.findAllByStatus(1);
        return ResponseEntity.ok(colors);
    }

    @GetMapping("/{asin}/sizes")
    public List<ProductSize> getSizesByAsin(@PathVariable String asin) {
        return productSizeRepository.findByProductAsin(asin);
    }
    @InternalApi
    @GetMapping("/internal/by-store/{storeId}")
    public ResponseEntity<List<Long>> getProductIdsByStore(@PathVariable Long storeId) {
        List<Long> productIds = productService.getProductIdsByStore(storeId);
        return ResponseEntity.ok(productIds);
    }
    @InternalApi
    @GetMapping("/findProductNameById")
    public ResponseEntity<Optional<String>> findProductNameById(@RequestParam Long productId) {
        return ResponseEntity.ok(productService.findProductNameById(productId));
    }
    @InternalApi
    @GetMapping("/getProductById")
    public ResponseEntity<ProductResponse> getProductById(@RequestParam Long idProduct ) {
        return ResponseEntity.ok(productService.getProductById(idProduct));
    }
    @GetMapping("/getStoreIdByProductId")
    public ResponseEntity<Long> getStoreIdByProductId(@RequestParam Long productId) {
        Optional<Long> storeId = productService.getStoreIdByProductId(productId);
        if (storeId.isPresent()) {
            return ResponseEntity.ok(storeId.get());
        }
        return null;
    }
    @GetMapping("/stats/total")
    public ResponseEntity<Long> getTotalProductCount() {
        return ResponseEntity.ok(productService.getTotalProductCount());
    }

    @GetMapping("/stats/by-status")
    public ResponseEntity<List<ProductStatsDTO>> getCountByStatus() {
        return ResponseEntity.ok(productService.getProductCountByStatus());
    }

    @GetMapping("/stats/by-type")
    public ResponseEntity<List<ProductStatsDTO>> getCountByType() {
        return ResponseEntity.ok(productService.getProductCountByType());
    }
    @GetMapping("/stats/by-store")
    public List<ProductStatsDTO> getProductCountByStore() {
        return productService.getProductCountByStore();
    }

    @GetMapping("/stats/by-created-month")
    public List<ProductStatsDTO> getProductCountByCreatedMonth() {
        return productService.getProductCountByCreatedMonth();
    }
    @GetMapping("/getAllEvaluateByOrderItem")
    public ResponseEntity<EvaluateResponse> getAllEvaluateByOrderItem(@RequestParam Long orderItemId) {
        return ResponseEntity.ok(productService.getEvaluateResponseByOrderItemId(orderItemId));
    }
    @PutMapping("/updateCommentBySeller")
    public ResponseEntity<?> updateCommentBySeller(@RequestParam Long evaluateId,@RequestParam String commentBySeller) {
        return ResponseEntity.ok(Map.of("message", productService.updateCommentVyEvaluate(evaluateId, commentBySeller)));
    }
    @PutMapping("/updateStatusEvaluate")
    public ResponseEntity<?> updateStatusEvaluate(@RequestParam Long evaluateId,@RequestParam int status) {
        return ResponseEntity.ok(Map.of("message", productService.actionStatusEvaluate(evaluateId, status)));
    }
    @GetMapping("getEvaluateByAsinProduct")
    public ResponseEntity<List<EvaluateResponse>> getEvaluateByAsinProduct(@RequestParam String asin) {
        return ResponseEntity.ok(productService.getEvaluateByProductAsin(asin));
    }
    @GetMapping("/getAllEvaluateByOrderItemAndStatus/{asin}")
    public List<EvaluateResponse> getPublicEvaluates(@PathVariable String asin) {
        return productService.getEvaluatesPublicByAsin(asin);
    }
    @GetMapping("/top-discounted")
    public List<ProductResponse> topDiscounted(
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) ProductStatus status // parse trực tiếp enum
    ) {
        return productService.getTopDiscounted(size, status);
    }
    @GetMapping("/{storeId}")
    public Page<ProductResponse> search(
            @PathVariable Long storeId,
            @RequestParam(required = false) String q,
            @RequestParam(required = false, defaultValue = "") String sort,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double min,
            @RequestParam(required = false) Double max,
            @RequestParam(required = false) Boolean discountOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        StoreProductFilter f = new StoreProductFilter(q, sort, category, min, max, discountOnly);
        Pageable pz = PageRequest.of(page, size);
        return productService.searchProductsByStore(storeId, f, pz);
    }

    // đếm cho filter nhanh
    @GetMapping("/{storeId}/counts/productType")
    public List<CategoryCountDTO> countType(@PathVariable Long storeId) {
        return productService.getProductTypeCountByStore(storeId);
    }

    @GetMapping("/{storeId}/counts/salesRank")
    public List<CategoryCountDTO> countSalesRank(@PathVariable Long storeId) {
        return productService.getSalesRankCountByStore(storeId);
    }

    @GetMapping("/{storeId}/counts/tags")
    public List<CategoryCountDTO> countTags(@PathVariable Long storeId) {
        return productService.getTagCountByStore(storeId);
    }

    @GetMapping("/{storeId}/counts/discounting")
    public long countDiscounting(@PathVariable Long storeId) {
        return productService.countDiscountingProductsByStore(storeId);
    }
    @GetMapping("/suggest")
    public List<ProductSuggestionDto> suggest(
            @RequestParam("q") String q,
            @RequestParam(value = "limit", defaultValue = "10") int limit
    ) {
        return productService.suggest(q, limit);
    }
    @PostMapping("/evaluates/summary")
    public ResponseEntity<?> getEvaluateSummary(@RequestBody List<String> asins) {
        return ResponseEntity.ok(productService.getEvaluateSummary(asins));
    }

}