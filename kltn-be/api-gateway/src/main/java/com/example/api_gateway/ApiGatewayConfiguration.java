package com.example.api_gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
        return builder.routes()

                // ADMIN-SERVICE
                .route(p -> p.path("/api/admin/**")
                        .uri("lb://admin-service"))

                // CART-SERVICE
                .route(p -> p.path("/api/cart/**")
                        .uri("lb://cart-service"))

                // EMAIL-SERVICE
                .route(p -> p.path("/api/email/**")
                        .uri("lb://email-service"))

                // ORDER-SERVICE
                .route(p -> p.path("/api/orders/**")
                        .uri("lb://order-service"))

                // PAYMENT-SERVICE
                .route(p -> p.path("/api/payment/**")
                        .uri("lb://payment-service"))

                // PRODUCT-SERVICE
                .route(p -> p.path("/api/products/**")
                        .uri("lb://product-service"))

                // RECOMMEND-SERVICE
                .route(p -> p.path("/api/recommend/**")
                        .uri("lb://recommend-service"))

                // SEARCH-SERVICE
                .route(p -> p.path("/api/search/**")
                        .uri("lb://search-service"))

                // SELLER-SERVICE
                .route(p -> p.path("/api/seller/**")
                        .uri("lb://seller-service"))

                // UPLOAD-SERVICE
                .route(p -> p.path("/api/upload/**")
                        .uri("lb://upload-service"))

                // USER-SERVICE
                .route(p -> p.path("/api/users/**")
                        .uri("lb://user-service"))

                .build();
    }
}
