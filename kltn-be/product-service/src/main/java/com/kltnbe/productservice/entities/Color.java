package com.kltnbe.productservice.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "color")
public class Color {
    @Id
    @Column(name = "color_id")

    private Long ColorId;

    @Column(name = "name_color")
    private String nameColor;

    @Column(name = "code_color")
    private String codeColor;

    @Column(name = "status")
    private int status;

    public Long getColorId() {
        return ColorId;
    }

    public void setColorId(Long colorId) {
        ColorId = colorId;
    }

//    public String getProductAsin() {
//        return productAsin;
//    }
//
//    public void setProductAsin(String productAsin) {
//        this.productAsin = productAsin;
//    }

    public String getNameColor() {
        return nameColor;
    }

    public void setNameColor(String nameColor) {
        this.nameColor = nameColor;
    }

    public String getCodeColor() {
        return codeColor;
    }

    public void setCodeColor(String codeColor) {
        this.codeColor = codeColor;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
