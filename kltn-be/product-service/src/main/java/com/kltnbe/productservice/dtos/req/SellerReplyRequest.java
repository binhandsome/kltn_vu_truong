package com.kltnbe.productservice.dtos.req;

import lombok.Data;

@Data
public class SellerReplyRequest {
    private String comment;
    private String productAsin;
}
