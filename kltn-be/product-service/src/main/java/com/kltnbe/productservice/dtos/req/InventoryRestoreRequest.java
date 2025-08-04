package com.kltnbe.productservice.dtos.req;

import lombok.Data;

@Data
public class InventoryRestoreRequest {
    private Long productId;
    private String color;    // tên màu, ví dụ "Đỏ"
    private String size;     // tên size, ví dụ "39"
    private Integer quantity;
}
