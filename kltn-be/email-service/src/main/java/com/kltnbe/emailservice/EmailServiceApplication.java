package com.kltnbe.emailservice;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync
@ComponentScan(basePackages = {
        "com.kltnbe.emailservice",        // package chính của service hiện tại
        "com.kltnbe.security"     // thêm package common-security
})
public class EmailServiceApplication{
    public static void main(String[] args) {
        SpringApplication.run(EmailServiceApplication.class, args);
    }
//    @Bean
//    public CommandLineRunner testSendEmail(EmailService emailService) {
//        return args -> {
//            emailService.sendOtpEmail("lethicuba1004@gmail.com", "123456");
//            System.out.println("Email đã được gửi!");
//        };

}