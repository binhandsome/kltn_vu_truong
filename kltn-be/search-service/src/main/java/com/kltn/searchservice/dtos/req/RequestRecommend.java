package com.kltn.searchservice.dtos.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RequestRecommend {
    private String accessToken;
    int size = 10;
    int page = 0;
}
