package com.kltnbe.sellerservice.configs;

import com.kltnbe.security.utils.JwtAuthenticationFilter;
import com.kltnbe.sellerservice.services.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final SellerService sellerService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST,
                                "/api/seller/registerSeller",
                                "/api/seller/verifyLoginSeller",
                                "/api/seller/checkLoginSeller"
                        ).permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/seller/getDiscountToUser").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/seller/public/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/seller/has-shop").authenticated()
                        .requestMatchers(HttpMethod.POST,   "/api/seller/public/*/follow").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/seller/public/*/follow").authenticated()
                        .requestMatchers(HttpMethod.GET,    "/api/seller/public/*/follow-status").authenticated()

                        .requestMatchers("/api/seller/internal/**").permitAll()
                        .requestMatchers("/api/seller/**").hasRole("SELLER")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(new ShopLockFilter(sellerService), JwtAuthenticationFilter.class);

        return http.build();
    }
}
