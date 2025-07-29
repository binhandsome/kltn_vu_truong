//package com.kltnbe.sellerservice.utils;
//
//import org.springframework.security.core.userdetails.UserDetails;
//
//
//import org.springframework.security.core.GrantedAuthority;
//
//import java.util.Collection;
//import java.util.Collections;
//
//public class CustomUserDetails implements UserDetails {
//
//    private final String username;
//    private final String role;
//
//    public CustomUserDetails(String username, String role) {
//        this.username = username;
//        this.role = role;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Collections.singleton(() -> role); // ROLE_SELLER, ROLE_ADMIN
//    }
//
//    @Override
//    public String getPassword() {
//        return null; // Không dùng password vì JWT đã xác thực
//    }
//
//    @Override
//    public String getUsername() {
//        return username;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//
//    public String getRole() {
//        return role;
//    }
//}
