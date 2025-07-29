//package com.kltnbe.userservice.utils;
//import com.kltnbe.userservice.utils.JwtUtil;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//
//import java.io.IOException;
//import java.util.Collections;
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws ServletException, IOException {
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            String token = authHeader.substring(7);
//            try {
//                if (jwtUtil.validateToken(token)) {
//                    String username = jwtUtil.getUsernameFromToken(token);
//                    String role = jwtUtil.getRoleFromToken(token);
//                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role); // Sử dụng role trực tiếp
//                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null, Collections.singletonList(authority));
//                    SecurityContextHolder.getContext().setAuthentication(auth);
//                }
//            } catch (RuntimeException e) {
//                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
//                return;
//            }
//        }
//        chain.doFilter(request, response);
//    }
//}