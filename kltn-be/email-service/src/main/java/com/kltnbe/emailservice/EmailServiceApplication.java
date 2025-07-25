package com.kltnbe.emailservice;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync
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