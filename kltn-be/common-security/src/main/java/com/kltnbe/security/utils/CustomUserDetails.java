package com.kltnbe.security.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final Long authId;      // ✅ thêm
    private final String username;
    private final String role;

    public CustomUserDetails(Long authId, String username, String role) {
        this.authId = authId;
        this.username = username;
        this.role = role;
    }

    public Long getAuthId() {
        return authId;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println(">>> Authorities: " + role); // ✅ Chỉ in role, tránh gọi lại chính hàm này
        return Collections.singleton(() -> role); // ROLE_SELLER, ROLE_ADMIN
    }


    @Override public String getPassword() { return null; }
    @Override public String getUsername() { return username; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }

    public String getRole() {
        return role;
    }
}
