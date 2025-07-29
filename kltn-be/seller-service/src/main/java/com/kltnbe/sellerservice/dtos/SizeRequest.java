package com.kltnbe.sellerservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SizeRequest {
    private String asin;
    private List<String> sizes; // ⬅️ Nhận nhiều size cùng lúc
}
