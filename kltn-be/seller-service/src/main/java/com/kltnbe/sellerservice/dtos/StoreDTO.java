package com.kltnbe.sellerservice.dtos;

import lombok.Data;
import java.util.Date;

@Data
public class StoreDTO {
    private Long storeId;
    private Long authId;
    private String storeName;
    private String storeDescription;
    private String storeAddress;
    private String storePhone;
    private String storeEmail;
    private String storeThumbnail;
    private String storeStatus;
    private Date createdAt;
    private Date updatedAt;
}