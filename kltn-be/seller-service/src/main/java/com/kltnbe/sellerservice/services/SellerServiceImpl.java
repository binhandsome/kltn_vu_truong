package com.kltnbe.sellerservice.services;

import com.kltnbe.sellerservice.clients.UploadServiceProxy;
import com.kltnbe.sellerservice.clients.UserServiceProxy;
import com.kltnbe.sellerservice.dtos.*;
import com.kltnbe.sellerservice.entities.StoreAuthentic;
import com.kltnbe.sellerservice.repositories.StoreAuthenticRepository;
import com.kltnbe.sellerservice.repositories.StoreRepository;

import feign.FeignException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor

public class SellerServiceImpl implements SellerService {


    private static final Logger log = LoggerFactory.getLogger(SellerServiceImpl.class);

    @Autowired
    private final StoreRepository storeRepository;
    private final UserServiceProxy userServiceProxy;
    private final UploadServiceProxy uploadImages;
    @Autowired
    private final UploadServiceProxy uploadServiceProxy;
    private final StoreAuthenticRepository storeAuthenticRepository;
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

                List<MultipartFile> images = new ArrayList<>();
                images.add(sellerDTO.getFrontCCCD());
                images.add(sellerDTO.getBackCCCD());
                images.add(sellerDTO.getImageYou());

                ResponseEntity<List<String>> imageUrls = uploadServiceProxy.uploadImages(images, "CCCD");
                if (imageUrls.getStatusCode().is2xxSuccessful() && imageUrls.getBody() != null && imageUrls.getBody().size() == 3) {
                    List<String> imageList = imageUrls.getBody();
                    StoreAuthentic storeAuthentic = new StoreAuthentic();
                    storeAuthentic.setFrontCccdUrl(imageList.get(0));
                    storeAuthentic.setBackCccdUrl(imageList.get(1));
                    storeAuthentic.setRealFaceImageUrl(imageList.get(2));
                    storeAuthentic.setAddressHouse(sellerDTO.getAddressHouse());
                    storeAuthentic.setAddressDelivery(sellerDTO.getAddressDelivery());
                    storeAuthentic.setAuthId(authId);
                    storeAuthenticRepository.save(storeAuthentic);
                    return ResponseEntity.ok(Map.of("message", "Đăng ký seller thành công"));
                } else {
                    return ResponseEntity.badRequest().body(Map.of("message", "Lỗi khi upload ảnh CCCD"));
                }
            } else {
                Map<String, String> responseMap = (Map<String, String>) registerAuth.getBody();
                String message = responseMap != null ? responseMap.getOrDefault("message", "Đăng ký thất bại") : "Đăng ký thất bại";
                return ResponseEntity.status(registerAuth.getStatusCode()).body(Map.of("message", message));
            }
        } catch (FeignException e) {
            log.error("Lỗi khi gọi user-service hoặc upload-service: {}", e.getMessage());
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


}