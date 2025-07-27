package com.kltnbe.productservice.dtos.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageGroupDTO {
    private String asin; // mã sản phẩm
    private List<Long> colorIds; // danh sách id màu
    private List<MultipartFile> files; // danh sách ảnh tương ứng

    // files[i] tương ứng với colorIds[i]
}