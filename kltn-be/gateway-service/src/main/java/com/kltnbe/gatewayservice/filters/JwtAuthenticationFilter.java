package com.kltnbe.gatewayservice.filters;

import com.kltnbe.gatewayservice.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    @Autowired
    private JwtUtil jwtUtil;

    private static final AntPathMatcher pathMatcher = new AntPathMatcher();

    // Các endpoint không cần xác thực
    private static final String[] PUBLIC_ENDPOINTS = {
            "/api/products/**",
            "/api/categories/**",
            "/api/auth/**",
            "/api/email/**"
    };

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        System.out.println("[Gateway] Request path: " + path);

        // Nếu endpoint thuộc danh sách public thì bỏ qua xác thực
        boolean isPublic = Arrays.stream(PUBLIC_ENDPOINTS)
                .anyMatch(pattern -> pathMatcher.match(pattern, path));

        if (isPublic) {
            return chain.filter(exchange);
        }

        // Kiểm tra token
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1; // Ưu tiên cao nhất
    }
}
