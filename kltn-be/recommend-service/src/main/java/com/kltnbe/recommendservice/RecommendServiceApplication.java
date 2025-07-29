package com.kltnbe.recommendservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableFeignClients
@ComponentScan(basePackages = {
		"com.kltnbe.recommendservice",        // package chính của service hiện tại
		"com.kltnbe.security"     // thêm package common-security
})
public class RecommendServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecommendServiceApplication.class, args);
	}

}
