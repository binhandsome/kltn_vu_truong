package com.kltnbe.productservice.dtos.req;

import lombok.Data;

import java.util.List;

@Data
public class ImageDTO {
    private Long idColor;
    private List<ImageInfoDTO> listImageByColor;

    public Long getIdColor() {
        return idColor;
    }

    public void setIdColor(Long idColor) {
        this.idColor = idColor;
    }

    public List<ImageInfoDTO> getListImageByColor() {
        return listImageByColor;
    }

    public void setListImageByColor(List<ImageInfoDTO> listImageByColor) {
        this.listImageByColor = listImageByColor;
    }
}
