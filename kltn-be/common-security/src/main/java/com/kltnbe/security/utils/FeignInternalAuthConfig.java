package com.kltnbe.security.utils;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignInternalAuthConfig implements RequestInterceptor {

    @Value("${internal.secret}")
    private String internalSecret;

    @Override
    public void apply(RequestTemplate template) {
        // ✅ Mỗi khi Feign gọi request nội bộ -> tự động thêm secret header
        template.header("X-Internal-Secret", internalSecret);
    }
}