package com.kltnbe.sellerservice.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColorDTO {
    private Long colorId;
    private String nameColor;
    private String codeColor;
    private Integer status;

}
