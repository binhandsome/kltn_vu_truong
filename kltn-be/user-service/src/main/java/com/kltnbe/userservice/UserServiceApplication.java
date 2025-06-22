package com.kltnbe.userservice;

import com.kltnbe.userservice.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
    @Bean
    public CommandLineRunner testDatabaseConnection(UserRepository repository) {
        return args -> {
            System.out.println("=== TESTING DATABASE CONNECTION ===");
            long count = repository.count();
            System.out.println("CurrencyExchange records found in DB: " + count);
        };
    }
}
