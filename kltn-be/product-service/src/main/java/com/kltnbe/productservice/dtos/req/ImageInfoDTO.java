package com.kltnbe.productservice.dtos.req;

import lombok.Data;

@Data
public class ImageInfoDTO {
    private String imageUrl;
    private Integer isMainImage;
    private Long image_id;
}