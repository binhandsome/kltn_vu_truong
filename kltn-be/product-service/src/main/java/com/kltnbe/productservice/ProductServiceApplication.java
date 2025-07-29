package com.kltnbe.productservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableFeignClients()
@SpringBootApplication
@EnableAsync
@ComponentScan(basePackages = {
        "com.kltnbe.productservice",        // package chính của service hiện tại
        "com.kltnbe.security"     // thêm package common-security
})
public class ProductServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }
}