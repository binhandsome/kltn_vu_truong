package com.kltnbe.adminservice.dtos.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAsinHistoryRequest {
    private String accessToken;
    private String asin;

}
