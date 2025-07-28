package com.kltnbe.productservice.controllers;


import com.kltnbe.productservice.clients.UploadServiceProxy;
import com.kltnbe.productservice.dtos.CategoryWithImageAndCount;
import com.kltnbe.productservice.dtos.req.*;
import com.kltnbe.productservice.dtos.res.CategoryResponse;
import com.kltnbe.productservice.dtos.res.CategoryWithImage;
import com.kltnbe.productservice.dtos.res.ProductFilterResponse;
import com.kltnbe.productservice.entities.*;
import com.kltnbe.productservice.repositories.*;
import com.kltnbe.productservice.services.AsyncUploadService;
import com.kltnbe.productservice.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private ProductSizeRepository productSizeRepository;
    @Autowired
    private ProductVariantRepository productVariantRepository;
    @Autowired
    private ProductImageRepository productImageRepository;
    private final AsyncUploadService  asyncUploadService;
    private final UploadServiceProxy  uploadServiceProxy;
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
    @PostMapping("/addProduct")
    public ResponseEntity<?> addProduct(@RequestBody ProductRequestDTO productRequestDTO) {
        return ResponseEntity.ok(productService.createProduct(productRequestDTO));
    }
    @GetMapping("/productByAsin/{asin}")
    public ResponseEntity<?> findProductByAsin(@PathVariable String asin) {
        return productService.getProductDetail(asin)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/addSize")
    public ResponseEntity<?> addSize(@RequestBody SizeRequest request) {
        return productService.addSize(request);
    }
    @DeleteMapping("/deleteSize")
    public ResponseEntity<?> deleteSize(@RequestParam Long sizeId) {
        try {
            productService.deleteSize(sizeId);
            return ResponseEntity.ok(Map.of("message", "✅ Xóa size thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "❌ Lỗi khi xóa size: " + e.getMessage()));
        }
    }

    @PostMapping(value = "/upload-images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImagesAsync(
            @RequestParam("asin") String asin,
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("colorIds") List<Long> colorIds) {

        if (files.size() != colorIds.size()) {
            return ResponseEntity.badRequest().body("❌ Số lượng ảnh và colorId không khớp!");
        }

        Optional<Product> productOpt = productRepository.findProductByAsin(asin);
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Không tìm thấy sản phẩm.");
        }

        Product product = productOpt.get();

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

        return ResponseEntity.ok("✅ Ảnh đang được xử lý và lưu nền.");
    }


    @PutMapping(value = "/update-image/{imageId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateImage(
            @RequestParam("file") MultipartFile file,
            @PathVariable Long imageId
    ) {
        productService.updateImage(file, imageId);
        return ResponseEntity.accepted().body("Đang xử lý upload ảnh...");
    }
    @PutMapping("/updateProduct")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequestDTO request) {
        return productService.updateProduct(request);
    }

    @PutMapping("/set-thumbnail")
    public ResponseEntity<?> setThumbnail(
            @RequestParam String asin,
            @RequestParam Long imageId
    ) {
        productService.setThumbnail(asin, imageId);
        return ResponseEntity.ok("✅ Cập nhật thumbnail thành công!");
    }
    @DeleteMapping("/deleteImage/{imageId}")
    public ResponseEntity<String> deleteImage(@PathVariable Long imageId) {
        try {
            productService.deleteImageById(imageId);
            return ResponseEntity.ok("✅ Xoá ảnh thành công.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Lỗi khi xoá ảnh: " + e.getMessage());
        }
    }
    @PutMapping("/deleteProduct/{asin}")
    public ResponseEntity<?> deleteProduct(@PathVariable String asin) {
        return productService.deleteProductByAsin(asin);
    }



}