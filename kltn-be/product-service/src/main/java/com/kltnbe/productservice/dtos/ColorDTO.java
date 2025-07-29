package com.kltnbe.productservice.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kltnbe.productservice.entities.Color;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColorDTO {
    @JsonProperty("color_id")
    private Long colorId;

    @JsonProperty("name_color")
    private String nameColor;

    @JsonProperty("code_color")
    private String codeColor;

    @JsonProperty("status")
    private Integer status;

    public ColorDTO(Color color) {
        this.colorId = color.getColorId();
        this.nameColor = color.getNameColor();
        this.codeColor = color.getCodeColor();
        this.status = color.getStatus();
    }

    public String getCodeColor() {
        return codeColor;
    }

    public void setCodeColor(String codeColor) {
        this.codeColor = codeColor;
    }

    public Long getColorId() {
        return colorId;
    }

    public void setColorId(Long colorId) {
        this.colorId = colorId;
    }

    public String getNameColor() {
        return nameColor;
    }

    public void setNameColor(String nameColor) {
        this.nameColor = nameColor;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
