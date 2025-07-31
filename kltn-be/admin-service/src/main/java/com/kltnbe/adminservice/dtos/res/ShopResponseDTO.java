package com.kltnbe.adminservice.dtos.res;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class ShopResponseDTO {
    private Long authId;
    private Long shopId;
    private String nameShop;
    private String thumbnailShop;
    private String descriptionShop;
    private String shopAddress;
    private String shopPhone;
    private String shopEmail;
    private String shopStatus;
    private String description;
    private Double avaluate;
    private Long followers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

