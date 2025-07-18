package com.kltnbe.cartservice.dtos.req;

import lombok.Data;

import java.util.List;

@Data
public class RemoveSelectedItemsRequest {
    private String token;
    private String cartId;
    private List<String> asinList;
}