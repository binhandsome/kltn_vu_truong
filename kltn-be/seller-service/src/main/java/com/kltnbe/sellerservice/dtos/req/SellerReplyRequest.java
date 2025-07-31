package com.kltnbe.sellerservice.dtos.req;

import lombok.Data;

@Data
public class SellerReplyRequest {
    private String productAsin; // cần để xác thực ownership
    private String comment;
}
