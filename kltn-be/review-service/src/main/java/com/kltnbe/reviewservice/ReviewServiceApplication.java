package com.kltnbe.reviewservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.kltnbe.reviewservice.clients")
@ComponentScan(basePackages = {
        "com.kltnbe.reviewservice",        // package chính của service hiện tại
        "com.kltnbe.security"     // thêm package common-security
})
public class ReviewServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ReviewServiceApplication.class, args);
    }
}