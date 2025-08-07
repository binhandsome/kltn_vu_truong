package com.kltnbe.productservice.dtos.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EvalueUserWithItemOrder {
    private String comment;
    private Long orderItemId;
    private List<MultipartFile> files;
    private String productAsin;
    private int rating;
}
