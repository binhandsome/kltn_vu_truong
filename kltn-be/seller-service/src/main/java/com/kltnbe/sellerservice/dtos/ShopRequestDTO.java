package com.kltnbe.sellerservice.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@Setter
public class ShopRequestDTO {
    private String accessToken;
    private String nameShop;
    private MultipartFile thumbnailShop;
    private String descriptionShop;
    private String shopAddress;
    private String shopPhone;
    private String shopEmail;
}