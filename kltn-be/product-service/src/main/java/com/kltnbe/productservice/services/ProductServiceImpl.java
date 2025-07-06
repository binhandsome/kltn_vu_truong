// ServiceImpl: ProductServiceImpl.java
package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.ColorDto;
import com.kltnbe.productservice.dtos.ProductDetailDto;
import com.kltnbe.productservice.dtos.ProductFilterDTO;
import com.kltnbe.productservice.dtos.req.ProductDetailRequest;
import com.kltnbe.productservice.dtos.req.ProductFileterAll;
import com.kltnbe.productservice.dtos.req.ProductFilterRequest;
//import com.kltnbe.productservice.dtos.res.ProductFilterResponse;
//import com.kltnbe.productservice.dtos.res.ProductSearchResponse;
import com.kltnbe.productservice.entities.Category;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductImage;
import com.kltnbe.productservice.entities.ProductSize;
import com.kltnbe.productservice.repositories.*;
import com.kltnbe.productservice.services.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Autowired
    private ProductImageRepository productImageRepository;
    @Autowired
    private ColorRepository colorRepository;

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



    @Override
    public Optional<ProductDetailDto> getProductDetail(String asin) {
        Optional<Product> productOpt = productRepository.findProductByAsin(asin);

        if (productOpt.isEmpty()) return Optional.empty();

        Product product = productOpt.get();

        // 1. Ảnh sản phẩm
        List<String> imageUrls = productImageRepository.findByProductAsin(asin)
                .stream()
                .map(ProductImage::getImageData)
                .collect(Collectors.toList());

        // 2. Size
        List<String> sizes = productSizeRepository.findByProductAsin(asin)
                .stream()
                .map(ProductSize::getSizeName)
                .collect(Collectors.toList());

        // 3. Màu sắc
        List<ColorDto> colors = new ArrayList<>();
        if (product.getColorAsin() != null) {
            List<Long> colorIds = parseColorIds(product.getColorAsin()); // implement parseColorIds
            colors = colorRepository.findAllById(colorIds)
                    .stream()
                    .map(c -> {
                        ColorDto dto = new ColorDto();
                        dto.setCode(c.getCodeColor());
                        dto.setName(c.getNameColor());
                        return dto;
                    })
                    .collect(Collectors.toList());
        }

        // 4. Danh mục (category)
        String categoryName = null;
        String categoryDescription = null;
        List<String> features = new ArrayList<>();

        Optional<Category> categoryOpt = categoryRepository.findByProductAsin(asin);
        if (categoryOpt.isPresent()) {
            Category cat = categoryOpt.get();
            categoryName = cat.getCategoryName();
            categoryDescription = cat.getCategoryDescription();
            if (cat.getCategoryFeatures() != null) {
                features = Arrays.asList(cat.getCategoryFeatures().split(";")); // hoặc theo phân tách bạn dùng
            }
        }

        // Gộp tất cả vào DTO
        ProductDetailDto detailDto = new ProductDetailDto();
        detailDto.setProduct(product);
        detailDto.setImageUrls(imageUrls);
        detailDto.setSizes(sizes);
        detailDto.setColors(colors);
        detailDto.setCategoryName(categoryName);
        detailDto.setCategoryDescription(categoryDescription);
        detailDto.setFeatures(features);

        return Optional.of(detailDto);
    }
    @Override
    public Page<Product> filterProducts(ProductFilterDTO filter) {
        Specification<Product> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // --- Lọc theo khoảng giá ---
            if (filter.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("productPrice"), filter.getMinPrice()));
            }
            if (filter.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("productPrice"), filter.getMaxPrice()));
            }
            // --- Lọc theo search keyword ---
            if (filter.getSearch() != null && !filter.getSearch().isBlank()) {
                String keyword = "%" + filter.getSearch().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get("productTitle")), keyword));
            }

            // --- Lọc theo màu ---
            if (filter.getColors() != null && !filter.getColors().isEmpty()) {
                List<Predicate> colorPredicates = new ArrayList<>();
                for (String color : filter.getColors()) {
                    colorPredicates.add(cb.like(root.get("colorAsin"), "%" + color + "%"));
                }
                predicates.add(cb.or(colorPredicates.toArray(new Predicate[0])));
            }

            // --- Lọc theo size ---
            if (filter.getSizes() != null && !filter.getSizes().isEmpty()) {
                Join<Product, ProductSize> sizeJoin = root.join("sizes", JoinType.LEFT);
                predicates.add(sizeJoin.get("sizeName").in(filter.getSizes()));
            }

            // --- Lọc theo category ---
            if (filter.getCategories() != null && !filter.getCategories().isEmpty()) {
                Join<Product, Category> categoryJoin = root.join("category", JoinType.LEFT);
                List<Predicate> catPredicates = new ArrayList<>();
                for (String cat : filter.getCategories()) {
                    catPredicates.add(cb.like(cb.lower(categoryJoin.get("categories")), "%" + cat.toLowerCase() + "%"));
                }
                predicates.add(cb.or(catPredicates.toArray(new Predicate[0])));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize(), getSort(filter.getSort()));
        return productRepository.findAll(spec, pageable);
    }



    private Sort getSort(String sortKey) {
        if (sortKey == null || sortKey.isBlank()) {
            return Sort.unsorted(); // Hoặc mặc định
        }
        switch (sortKey) {
            case "priceAsc": return Sort.by("productPrice").ascending();
            case "priceDesc": return Sort.by("productPrice").descending();
            case "rating": return Sort.by("averageRating").descending();
            case "latest": return Sort.by("createdAt").descending();
            case "popularity": return Sort.by("numberOfRatings").descending();
            default: return Sort.unsorted();
        }
    }
    public List<Long> parseColorIds(String colorAsin) {
        if (colorAsin == null || colorAsin.trim().isEmpty()) {
            return Collections.emptyList();
        }

        return Arrays.stream(colorAsin.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> {
                    try {
                        return Long.parseLong(s);
                    } catch (NumberFormatException e) {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }



}