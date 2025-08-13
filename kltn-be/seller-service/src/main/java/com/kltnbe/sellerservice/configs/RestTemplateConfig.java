//package com.kltnbe.sellerservice.configs;
//
//import com.kltnbe.security.utils.JwtAuthenticationFilter;
//import com.kltnbe.sellerservice.services.SellerService;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//@EnableWebSecurity
//public class RestTemplateConfig {
//
//    @Autowired
//    private JwtAuthenticationFilter jwtAuthenticationFilter;
//    @Autowired
//    private SellerService sellerService; // << thêm
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .cors(cors -> cors.configure(http))
//                .csrf(AbstractHttpConfigurer::disable)
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(HttpMethod.POST,
//                                "/api/seller/registerSeller",
//                                "/api/seller/verifyLoginSeller",
//                                "/api/seller/checkLoginSeller"
//                        ).permitAll()
//                        .requestMatchers(HttpMethod.GET,"/api/seller/getDiscountToUser").permitAll()
//                        // header shop public
//                        .requestMatchers(HttpMethod.GET, "/api/seller/public/**").permitAll()
//                        // follow endpoints — cho phép bất kỳ user đăng nhập
//                        .requestMatchers(HttpMethod.POST, "/api/seller/public/*/follow").authenticated()
//                        .requestMatchers(HttpMethod.DELETE, "/api/seller/public/*/follow").authenticated()
//                        .requestMatchers(HttpMethod.GET, "/api/seller/public/*/follow-status").authenticated()
//                        .requestMatchers("/api/seller/internal/**").permitAll()
//                        // còn lại mới yêu cầu SELLER
//                        .requestMatchers("/api/seller/**").hasRole("SELLER")
//                        .anyRequest().authenticated()
//                )
//                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
//                    .addFilterAfter(new ShopLockFilter(sellerService), JwtAuthenticationFilter.class);
//
//        return http.build();
//    }
//    @Bean
//    public ModelMapper modelMapper() {
//        return new ModelMapper();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedMethods("*")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }
//
//}
