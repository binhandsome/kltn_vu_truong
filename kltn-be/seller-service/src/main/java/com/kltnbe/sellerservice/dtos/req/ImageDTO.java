package com.kltnbe.sellerservice.dtos.req;

import lombok.Data;

import java.util.List;

@Data
public class ImageDTO {
    private Long idColor;
    private List<ImageInfoDTO> listImageByColor;
}
