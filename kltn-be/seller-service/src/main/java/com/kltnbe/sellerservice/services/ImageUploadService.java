package com.kltnbe.sellerservice.services;
import com.kltnbe.sellerservice.clients.UploadServiceProxy;
import com.kltnbe.sellerservice.dtos.SellerDTO;
import com.kltnbe.sellerservice.entities.StoreAuthentic;
import com.kltnbe.sellerservice.repositories.StoreAuthenticRepository;
import feign.FeignException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
class ImageUploadService {

    private static final Logger log = LoggerFactory.getLogger(ImageUploadService.class);

    private final UploadServiceProxy uploadServiceProxy;
    private final StoreAuthenticRepository storeAuthenticRepository;

    @Autowired
    public ImageUploadService(UploadServiceProxy uploadServiceProxy, StoreAuthenticRepository storeAuthenticRepository) {
        this.uploadServiceProxy = uploadServiceProxy;
        this.storeAuthenticRepository = storeAuthenticRepository;
    }

    @Async
    @Transactional
    public void processImageUploadAndStore(Long authId, SellerDTO sellerDTO) {
        try {
            log.info("Bắt đầu xử lý bất đồng bộ cho authId: {}, luồng: {}", authId, Thread.currentThread().getName());
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
                log.info("Đăng ký seller hoàn tất cho authId: {}", authId);
            } else {
                log.error("Lỗi khi upload ảnh CCCD cho authId: {}", authId);
            }
        } catch (Exception e) {
            log.error("Lỗi khi xử lý upload ảnh và lưu thông tin xác thực cho authId {}: {}", authId, e.getMessage());
        }
    }
}