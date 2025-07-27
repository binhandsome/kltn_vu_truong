package com.kltnbe.productservice.dtos.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageUploadDTO {
    private String asin;
    private List<ImageGroupDTO> imageGroups;
}
