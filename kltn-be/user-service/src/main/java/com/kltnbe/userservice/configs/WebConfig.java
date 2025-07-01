package com.kltnbe.userservice.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Cho phép tất cả endpoint
                .allowedOrigins("http://localhost:3000") // FE domain
                .allowedMethods("*") // GET, POST, PUT, DELETE...
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
