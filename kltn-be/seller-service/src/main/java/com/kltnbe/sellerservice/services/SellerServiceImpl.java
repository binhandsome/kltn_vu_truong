package com.kltnbe.sellerservice.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kltnbe.sellerservice.clients.ProductServiceProxy;
import com.kltnbe.sellerservice.clients.UploadServiceProxy;
import com.kltnbe.sellerservice.clients.UserServiceProxy;
import com.kltnbe.sellerservice.dtos.*;
import com.kltnbe.sellerservice.dtos.res.ProductResponseDTO;
import com.kltnbe.sellerservice.dtos.ProductRequestDTO;
import com.kltnbe.sellerservice.entities.*;
import com.kltnbe.sellerservice.repositories.*;

import feign.FeignException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;

@Service
@RequiredArgsConstructor

public class SellerServiceImpl implements SellerService {

    private static final Logger log = LoggerFactory.getLogger(SellerServiceImpl.class);

    @Autowired
//    private final StoreRepository storeRepository;
    private final UserServiceProxy userServiceProxy;
    private final UploadServiceProxy uploadImages;
    private final ShopRepository shopRepository;
    private final ShopDiscountRepository shopDiscountRepository;
    private final UserUseDiscountRepository userUseDiscountRepository;
    private final ImageUploadService imageUploadService; // Bean mới
    private final ProductServiceProxy productFeignClient;

    @Autowired
    private final UploadServiceProxy uploadServiceProxy;
    private final StoreAuthenticRepository storeAuthenticRepository;
    private final ShopEditRepository shopEditRepository;
    @Autowired
    private ProductServiceProxy productServiceProxy;

    @Value("${internal.secret}")
    private String internalSecretKey;

    @Override
    public ResponseEntity<?> registerSeller(SellerDTO sellerDTO) {
        System.out.println("📥 Nhận request đăng ký seller:");
        System.out.println("📨 Họ tên: " + sellerDTO.getFirstName() + " " + sellerDTO.getLastName());
        System.out.println("📨 Email: " + sellerDTO.getEmail());
        System.out.println("📨 Username: " + sellerDTO.getUsername());
        System.out.println("📨 SĐT: " + sellerDTO.getSdt());
        System.out.println("📨 Địa chỉ nhà: " + sellerDTO.getAddressHouse());
        System.out.println("📨 Địa chỉ giao hàng: " + sellerDTO.getAddressDelivery());
        if (sellerDTO.getFrontCCCD() != null) {
            System.out.println("📎 frontCCCD: " + sellerDTO.getFrontCCCD().getOriginalFilename());
        }
        if (sellerDTO.getBackCCCD() != null) {
            System.out.println("📎 backCCCD: " + sellerDTO.getBackCCCD().getOriginalFilename());
        }
        if (sellerDTO.getImageYou() != null) {
            System.out.println("📎 imageYou: " + sellerDTO.getImageYou().getOriginalFilename());
        }

        if (sellerDTO.getEmail() == null || sellerDTO.getUsername() == null ||
                sellerDTO.getPassword() == null || sellerDTO.getConfirmPassword() == null ||
                sellerDTO.getFrontCCCD() == null || sellerDTO.getBackCCCD() == null ||
                sellerDTO.getImageYou() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Vui lòng cung cấp đầy đủ thông tin"));
        }

        try {
            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.setUsername(sellerDTO.getUsername());
            registerRequest.setEmail(sellerDTO.getEmail());
            registerRequest.setFirstName(sellerDTO.getFirstName());
            registerRequest.setLastName(sellerDTO.getLastName());
            registerRequest.setPassword(sellerDTO.getPassword());
            registerRequest.setConfirmPassword(sellerDTO.getConfirmPassword());
            registerRequest.setSdt(sellerDTO.getSdt());
            registerRequest.setOtp(sellerDTO.getOtp());

            ResponseEntity<?> registerAuth = userServiceProxy.register(registerRequest);
            Long authId = userServiceProxy.findIdByEmail(sellerDTO.getEmail());
            if (authId != null && storeAuthenticRepository.findByAuthId(authId).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email đã được đăng ký làm seller"));
            }

            if (registerAuth.getStatusCode().is2xxSuccessful() ||
                    (registerAuth.getBody() instanceof Map &&
                            ((Map<String, String>) registerAuth.getBody()).getOrDefault("message", "").equals("Email đã được sử dụng"))) {
                if (authId == null) {
                    authId = userServiceProxy.findIdByEmail(sellerDTO.getEmail());
                }

                if (authId == null) {
                    return ResponseEntity.badRequest().body(Map.of("message", "Không tìm thấy tài khoản với email này"));
                }
                imageUploadService.processImageUploadAndStore(authId, sellerDTO);
                return ResponseEntity.ok(Map.of("message", "Đăng ký tài khoản thành công, đang xử lý thông tin xác thực"));
            } else {
                Map<String, String> responseMap = (Map<String, String>) registerAuth.getBody();
                String message = responseMap != null ? responseMap.getOrDefault("message", "Đăng ký thất bại") : "Đăng ký thất bại";
                return ResponseEntity.status(registerAuth.getStatusCode()).body(Map.of("message", message));
            }
        } catch (FeignException e) {
            log.error("Lỗi khi gọi user-service: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("message", "Lỗi khi xử lý yêu cầu: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Lỗi hệ thống: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Lỗi hệ thống: " + e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> loginWithSeller(LoginRequest loginRequest) {
        try {
            ResponseEntity<?> response = userServiceProxy.checkLoginSeller(loginRequest);
            return ResponseEntity.ok(Map.of("message", "✅ Đã gửi OTP"));
        } catch (FeignException.FeignClientException ex) {
            int status = ex.status();
            switch (status) {
                case 401:
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("message", "❌ Email hoặc mật khẩu không đúng"));
                case 403:
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(Map.of("message", "🚫 Tài khoản không phải là seller"));
                case 500:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(Map.of("message", "⚠️ Lỗi hệ thống khi gửi OTP"));
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(Map.of("message", "❗ Lỗi không xác định từ user-service"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "❗ Không thể kết nối đến user-service"));
        }
    }

    @Override
    public ResponseEntity<?> verifyLoginSeller(RequestInfomation requestInfomation) {
        return userServiceProxy.verifyLoginSeller(requestInfomation);
    }

    @Override
    public ResponseEntity<?> getInfoUser(String accessToken) {
        ResponseEntity<?> response = userServiceProxy.getUserWithAccessToken(accessToken);
        return response;
    }
    @Override
    public ShopResponseDTO createShop(Long authId, ShopRequestDTO shopRequestDTO) {
        // Lấy authId từ accessToken
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }

        if (shopRepository.existsByAuthId(authId)) {
            throw new IllegalStateException("User already has a shop");
        }
        if (shopRequestDTO.getThumbnailShop() != null) {
            System.out.println("📎 thumbnail: " + shopRequestDTO.getThumbnailShop().getOriginalFilename());
        }

        ResponseEntity<String> urlImage = uploadServiceProxy.uploadImage(shopRequestDTO.getThumbnailShop(), "Thumbnail");

            Shop shop = Shop.builder()
                    .authId(authId)
                    .nameShop(shopRequestDTO.getNameShop())
                    .thumbnailShop(urlImage.getBody())
                    .descriptionShop(shopRequestDTO.getDescriptionShop())
                    .shopAddress(shopRequestDTO.getShopAddress())
                    .shopPhone(shopRequestDTO.getShopPhone())
                    .shopEmail(shopRequestDTO.getShopEmail())
                    .shopStatus(Shop.ShopStatus.pending)
                    .evaluateShop(0.0)
                    .followersShop(0L)// Mặc định là pending
                    .build();

        Shop savedShop = shopRepository.save(shop);

        // Ánh xạ sang ShopResponseDTO
        ShopResponseDTO response = new ShopResponseDTO();
        response.setShopId(savedShop.getShopId());
        response.setNameShop(savedShop.getNameShop());
        response.setThumbnailShop(savedShop.getThumbnailShop());
        response.setDescriptionShop(savedShop.getDescriptionShop());
        response.setShopAddress(savedShop.getShopAddress());
        response.setShopPhone(savedShop.getShopPhone());
        response.setShopEmail(savedShop.getShopEmail());
        response.setShopStatus(savedShop.getShopStatus().name());
        response.setCreatedAt(savedShop.getCreatedAt());
        return response;
    }

    @Override
    public ShopDiscountResponseDTO createShopDiscount(Long authId, ShopDiscountRequestDTO discountRequestDTO) {
        // Lấy authId từ accessToken
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }
        Shop shop = shopRepository.findByAuthId(authId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found for this user"));
        ShopDiscount discount = new ShopDiscount();
        discount.setShopId(shop.getShopId());
        discount.setNameDiscount(discountRequestDTO.getNameDiscount());
        discount.setMinPrice(discountRequestDTO.getMinPrice());
        discount.setPercentValue(discountRequestDTO.getPercentValue());
        discount.setDayStart(LocalDateTime.parse(discountRequestDTO.getDayStart()));
        discount.setDayEnd(LocalDateTime.parse(discountRequestDTO.getDayEnd()));
        discount.setCreatedAt(LocalDateTime.now());
        discount.setUpdatedAt(LocalDateTime.now());
        discount.setStatus(discountRequestDTO.getStatus());
        ShopDiscount savedDiscount = shopDiscountRepository.save(discount);

        // Ánh xạ sang ShopDiscountResponseDTO
        ShopDiscountResponseDTO response = new ShopDiscountResponseDTO();
        response.setDiscountShopId(savedDiscount.getDiscountShopId());
        response.setNameDiscount(savedDiscount.getNameDiscount());
        response.setMinPrice(savedDiscount.getMinPrice());
        response.setPercentValue(savedDiscount.getPercentValue());
        response.setDayStart(savedDiscount.getDayStart());
        response.setDayEnd(savedDiscount.getDayEnd());
        response.setShopId(savedDiscount.getShopId());
        response.setCreatedAt(savedDiscount.getCreatedAt());
        response.setStatus(savedDiscount.getStatus());
        return response;
    }

    @Override
    public UseDiscountResponseDTO useDiscount(Long authId, UseDiscountRequestDTO useDiscountRequestDTO) {
        // Lấy authId từ accessToken
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }
        ShopDiscount discount = shopDiscountRepository.findById(useDiscountRequestDTO.getDiscountShopId())
                .orElseThrow(() -> new IllegalArgumentException("Discount not found"));
        if (userUseDiscountRepository.existsByUserIdAndDiscountShopId(authId, useDiscountRequestDTO.getDiscountShopId())) {
            throw new IllegalStateException("User has already used this discount");
        }
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(discount.getDayStart()) || now.isAfter(discount.getDayEnd())) {
            throw new IllegalStateException("Discount is not valid at this time");
        }

        // Ghi nhận sử dụng mã giảm giá
        UserUseDiscount userUseDiscount = new UserUseDiscount();
        userUseDiscount.setUserId(authId);
        userUseDiscount.setDiscountShopId(useDiscountRequestDTO.getDiscountShopId());
        userUseDiscount.setCreateAt(LocalDateTime.now());

        UserUseDiscount savedUseDiscount = userUseDiscountRepository.save(userUseDiscount);

        // Ánh xạ sang UseDiscountResponseDTO
        UseDiscountResponseDTO response = new UseDiscountResponseDTO();
        response.setUseDiscountId(savedUseDiscount.getUseDiscountId());
        response.setUserId(savedUseDiscount.getUserId());
        response.setDiscountShopId(savedUseDiscount.getDiscountShopId());
        response.setCreateAt(savedUseDiscount.getCreateAt());
        return response;
    }
    @Override
    public ShopStatusResponseDTO hasShop(Long authId) {
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }

        ShopStatusResponseDTO response = new ShopStatusResponseDTO();
        response.setHasShop(shopRepository.existsByAuthId(authId));
        if (response.isHasShop()) {
            Shop shop = shopRepository.findByAuthId(authId)
                    .orElseThrow(() -> new IllegalStateException("Shop not found"));
            response.setShopStatus(shop.getShopStatus().name());
        } else {
            response.setShopStatus(null);
        }
        return response;
    }

    @Override
    public ShopResponseDTO getShopInfo(Long authId) {
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }

        Shop shop = shopRepository.findByAuthId(authId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found for this user"));
        ShopResponseDTO response = new ShopResponseDTO();
        response.setShopId(shop.getShopId());
        response.setNameShop(shop.getNameShop());
        response.setThumbnailShop(shop.getThumbnailShop());
        response.setDescriptionShop(shop.getDescriptionShop());
        response.setShopAddress(shop.getShopAddress());
        response.setShopPhone(shop.getShopPhone());
        response.setShopEmail(shop.getShopEmail());
        response.setShopStatus(shop.getShopStatus().name());
        response.setCreatedAt(shop.getCreatedAt());
        response.setDescription(shop.getDescriptionShop());
        response.setAvaluate(shop.getEvaluateShop());
        response.setFollowers(shop.getFollowersShop());
        return response;
    }

    @Override
    public List<ShopDiscountResponseDTO> getShopDiscounts(Long authId) {
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }
        Shop shop = shopRepository.findByAuthId(authId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found for this user"));
        List<ShopDiscount> discounts = shopDiscountRepository.findByShopId(shop.getShopId());
        return discounts.stream().map(discount -> {
            ShopDiscountResponseDTO response = new ShopDiscountResponseDTO();
            response.setDiscountShopId(discount.getDiscountShopId());
            System.out.println("id discount la" + response.getDiscountShopId());
            response.setNameDiscount(discount.getNameDiscount());
            response.setMinPrice(discount.getMinPrice());
            response.setPercentValue(discount.getPercentValue());
            response.setDayStart(discount.getDayStart());
            response.setDayEnd(discount.getDayEnd());
            response.setShopId(discount.getShopId());
            response.setCreatedAt(discount.getCreatedAt());
            response.setStatus(discount.getStatus());
            return response;
        }).collect(Collectors.toList());
    }

    @Override
    public ShopResponseDTO updateShop(ShopRequestDTO shopUpdateRequestDTO, Long authId) {
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }

        Shop shop = shopRepository.findByAuthId(authId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found for this user"));

        // Update fields
        if (shopUpdateRequestDTO.getNameShop() != null) {
            shop.setNameShop(shopUpdateRequestDTO.getNameShop());
        }
        if (shopUpdateRequestDTO.getThumbnailShop() != null) {
                ResponseEntity<String> urlImage = uploadServiceProxy.uploadImage(shopUpdateRequestDTO.getThumbnailShop(), "Thumbnail");
                if (urlImage.getBody() != null) {
                    shop.setThumbnailShop(urlImage.getBody());
                }
        }
        if (shopUpdateRequestDTO.getDescriptionShop() != null) {
            shop.setDescriptionShop(shopUpdateRequestDTO.getDescriptionShop());
        }
        if (shopUpdateRequestDTO.getShopAddress() != null) {
            shop.setShopAddress(shopUpdateRequestDTO.getShopAddress());
        }
        if (shopUpdateRequestDTO.getShopPhone() != null) {
            shop.setShopPhone(shopUpdateRequestDTO.getShopPhone());
        }
        if (shopUpdateRequestDTO.getShopEmail() != null) {
            shop.setShopEmail(shopUpdateRequestDTO.getShopEmail());
        }

        Shop updatedShop = shopRepository.save(shop);
        ShopResponseDTO response = new ShopResponseDTO();
        response.setShopId(updatedShop.getShopId());
        response.setNameShop(updatedShop.getNameShop());
        response.setThumbnailShop(updatedShop.getThumbnailShop());
        response.setDescriptionShop(updatedShop.getDescriptionShop());
        response.setShopAddress(updatedShop.getShopAddress());
        response.setShopPhone(updatedShop.getShopPhone());
        response.setShopEmail(updatedShop.getShopEmail());
        response.setShopStatus(updatedShop.getShopStatus().name());
        response.setCreatedAt(updatedShop.getCreatedAt());
        response.setDescription(updatedShop.getDescriptionShop());
        response.setAvaluate(updatedShop.getEvaluateShop());
        response.setFollowers(updatedShop.getFollowersShop());
        return response;
    }

    @Override
    @Transactional
    public void deleteShop(Long authId) {
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }
        Shop shop = shopRepository.findByAuthId(authId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found for this user"));
        shopDiscountRepository.deleteByShopId(shop.getShopId());
        shopRepository.delete(shop);
    }

    @Override
    public ShopResponseDTO addShopEdit(ShopRequestDTO shopRequestDTO, Long authId) {
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }
        Shop shop = shopRepository.findByAuthId(authId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found for this user"));
        Boolean exists = shopEditRepository.existsByShopIdAndStatus(shop.getShopId(), 0L);
        if (exists) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "⛔ Bạn đã gửi yêu cầu chỉnh sửa rồi!");
        }
        ShopEdit shopEdit = new ShopEdit();
        if (shopRequestDTO.getNameShop() != null) {
            shopEdit.setNameShop(shopRequestDTO.getNameShop());
        }
        if (shopRequestDTO.getThumbnailShop() != null) {
            ResponseEntity<String> urlImage = uploadServiceProxy.uploadImage(shopRequestDTO.getThumbnailShop(), "Thumbnail");
            if (urlImage.getBody() != null) {
                shopEdit.setThumbnailShop(urlImage.getBody());
            }
        }
        if (shopRequestDTO.getDescriptionShop() != null) {
            shopEdit.setDescriptionShop(shopRequestDTO.getDescriptionShop());
        }
        if (shopRequestDTO.getShopAddress() != null) {
            shopEdit.setShopAddress(shopRequestDTO.getShopAddress());
        }
        if (shopRequestDTO.getShopPhone() != null) {
            shopEdit.setShopPhone(shopRequestDTO.getShopPhone());
        }
        if (shopRequestDTO.getShopEmail() != null) {
            shopEdit.setShopEmail(shopRequestDTO.getShopEmail());
        }
        shopEdit.setStatus(0L);
        shopEdit.setShopId(shop.getShopId());
        ShopEdit updatedShopEdit = shopEditRepository.save(shopEdit);
        ShopResponseDTO response = new ShopResponseDTO();
        response.setShopId(updatedShopEdit.getShopId());
        response.setNameShop(updatedShopEdit.getNameShop());
        response.setThumbnailShop(updatedShopEdit.getThumbnailShop());
        response.setDescriptionShop(updatedShopEdit.getDescriptionShop());
        response.setShopAddress(updatedShopEdit.getShopAddress());
        response.setShopPhone(updatedShopEdit.getShopPhone());
        response.setShopEmail(updatedShopEdit.getShopEmail());
        response.setCreatedAt(updatedShopEdit.getCreatedAt());
        response.setDescription(updatedShopEdit.getDescriptionShop());

        return response;
    }
    public ResponseEntity<?> updateDiscountShop(ShopDiscountRequestDTO discountRequestDTO, Long authId) {
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }
        Shop shop = shopRepository.findByAuthId(authId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found for this user"));
        ShopDiscount shopDiscount = shopDiscountRepository.findByDiscountShopIdAndShopId(discountRequestDTO.getShopDiscountId(), shop.getShopId());
        // Update fields
        if (discountRequestDTO.getNameDiscount() != null) {
            shopDiscount.setNameDiscount(discountRequestDTO.getNameDiscount());
        }
        if (discountRequestDTO.getStatus() != null) {
            shopDiscount.setStatus(discountRequestDTO.getStatus());
        }
        if (discountRequestDTO.getMinPrice() != null) {
            shopDiscount.setMinPrice(discountRequestDTO.getMinPrice());
        }
        if (discountRequestDTO.getDayStart() != null) {
            shopDiscount.setDayStart(LocalDateTime.parse(discountRequestDTO.getDayStart()));
        }
        if (discountRequestDTO.getDayEnd() != null) {
            shopDiscount.setDayEnd(LocalDateTime.parse(discountRequestDTO.getDayEnd()));
        }
        if (discountRequestDTO.getPercentValue() != null) {
            shopDiscount.setPercentValue(discountRequestDTO.getPercentValue() );
        }
        ShopDiscount updateDiscountShop = shopDiscountRepository.save(shopDiscount);
        return ResponseEntity.ok(Map.of("message", "Chỉnh sửa mã giảm giá thành công"));
    }
    @Override
    @Transactional
    public ResponseEntity<?> deleteDiscountShop(Long authId, Long shopDiscountId) {
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }
        Shop shop = shopRepository.findByAuthId(authId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found for this user"));
        ShopDiscount shopDiscount = shopDiscountRepository.findByDiscountShopIdAndShopId(shopDiscountId, shop.getShopId());
        if (shopDiscount == null) {
            throw new IllegalArgumentException("Discount not found");
        }
        shopDiscountRepository.delete(shopDiscount);
        return ResponseEntity.ok(Map.of("message", "Xóa mã giảm giá thành công"));
    }

    @Override
    public Long getIdShopByAuthId(Long authId) {
        if (authId == null) {
            throw new IllegalArgumentException("Invalid access token");
        }
        Shop shop = shopRepository.findByAuthId(authId)
                .orElseThrow(() -> new IllegalArgumentException("Shop not found for this user"));
        return shop.getShopId();
    }

    @Override
    public ResponseEntity<?> createProduct(ProductRequestDTO productRequestDTO, Long authId) {
        try {
            System.out.println("📤 Feign gửi qua Product-service: " + new ObjectMapper().writeValueAsString(productRequestDTO));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Optional<Shop> shop = Optional.ofNullable(shopRepository.findByAuthId(authId).orElseThrow(() -> new RuntimeException("❌ Không tìm thấy store của seller này")));
        productRequestDTO.setShopId(shop.get().getShopId());
        return productServiceProxy.addProduct(productRequestDTO, authId);
    }

    @Override
    public ResponseEntity<?> authIdGetToProduct(Long shopId) {
        Shop shop = shopRepository.findById(shopId).orElseThrow(() -> new RuntimeException("Shop not found for this user"));
        return ResponseEntity.ok(shop.getAuthId());
    }
    @Override
    public ResponseEntity<?> findProductByAsin(String asin, Long authId) {
        return productServiceProxy.findProductByAsin(asin, authId);
    }

    @Override
    public ResponseEntity<?> addSize(SizeRequest request, Long authId) {
        return productServiceProxy.addSize(request, authId);
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteSize(Long sizeId, Long authId) {
        return productServiceProxy.deleteSize(sizeId, authId);
    }

    @Override
    public ResponseEntity<?> uploadImagesAsync(String asin, List<MultipartFile> files, List<Long> colorIds, Long authId) {
        return productServiceProxy.uploadImagesAsync(asin, files, colorIds, authId);
    }

    @Override
    public ResponseEntity<String> updateImage(Long imageId, MultipartFile file, Long authId) {
        return productServiceProxy.updateImage(file, imageId,authId);
    }

    @Override
    public ResponseEntity<?> updateProduct(ProductRequestDTO request, Long authId) {
        return productServiceProxy.updateProduct(request, authId);
    }

    @Override
    public ResponseEntity<?> setThumbnail(String asin, Long imageId, Long authId) {
        return productServiceProxy.setThumbnail(asin, imageId, authId);
    }

    @Override
    public ResponseEntity<String> deleteImage(Long imageId, Long authId) {
        return productServiceProxy.deleteImage(imageId, authId);
    }

    @Override
    public ResponseEntity<?> deleteProduct(String asin, Long authId) {
        return productServiceProxy.deleteProduct(asin, authId);
    }
    @Override
    public List<ProductResponseDTO> getProductsBySeller(Long storeId) {
        return productFeignClient.getProductsBySeller(storeId);
    }

    @Override
    public List<ProductVariantDTO> getVariantsByProduct(Long productId) {
        return productFeignClient.getVariantsByProduct(productId);
    }

    @Override
    public ProductVariantDTO getVariant(Long variantId) {
        return productFeignClient.getVariant(variantId);
    }
    @Override
    public void updateProductStatus(Long productId, String status) {
        productFeignClient.updateStatus(productId, status);
    }

    @Override
    public void deleteVariant(Long variantId) {
        productFeignClient.deleteVariant(variantId);
    }

    @Override
    public void deleteProduct(String asin) {
        productFeignClient.deleteProduct(asin);
    }

    @Override
    public void addProduct(ProductRequestDTO product) {
        productFeignClient.addProduct(product);
    }

    @Override
    public void updateProduct(ProductRequestDTO product) {
        productFeignClient.updateProduct(product);
    }

    @Override
    public ProductVariantDTO sellVariant(Long variantId, int quantity) {
        return productFeignClient.sellVariant(variantId, quantity);
    }
    public ProductResponseDTO getProductWithSizes(String asin, Long storeId) {
        List<ProductResponseDTO> allProducts = productFeignClient.getProductsBySeller(storeId);
        ProductResponseDTO product = allProducts.stream()
                .filter(p -> p.getAsin().equals(asin))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với asin: " + asin));

        // Gọi API lấy size theo ASIN
        List<ProductSizeDTO> sizes = productFeignClient.getSizesByAsin(asin);

        // Gán size vào product response
        product.setSize(sizes);

        return product;
    }
    @Override
    public void updateVariantInfo(Long variantId, BigDecimal price, int quantity) {
        ProductVariantDTO variant = productFeignClient.getVariant(variantId);
        int currentQuantity = variant.getQuantityInStock();
        int newQuantity = currentQuantity + quantity;

        productFeignClient.updateVariant(variantId,price,newQuantity);
    }
    @Override
    public ProductVariantDTO createVariant(ProductVariantDTO dto) {
        return productFeignClient.createVariant(dto);
    }
    @Override
    public List<ProductSizeDTO> getSizesByAsin(String asin) {
        return productFeignClient.getSizesByAsin(asin);
    }

}

