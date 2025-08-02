package com.kltnbe.orderservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TitleAndImgSeller {
    private String title;
    private String thumbnail;
}
