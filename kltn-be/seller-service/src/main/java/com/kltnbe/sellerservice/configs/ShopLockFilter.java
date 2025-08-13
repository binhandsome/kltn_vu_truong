package com.kltnbe.sellerservice.configs;

import com.kltnbe.security.utils.CustomUserDetails;
import com.kltnbe.sellerservice.entities.Shop;
import com.kltnbe.sellerservice.services.SellerService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
@AllArgsConstructor
public class ShopLockFilter extends OncePerRequestFilter {


    private final SellerService sellerService;
    private final AntPathMatcher matcher = new AntPathMatcher();

    // Những endpoint vẫn cho phép truy cập khi shop bị khóa (dashboard lock, public info, appeal, internal…)
    private static final List<String> ALLOW_WHEN_LOCKED = List.of(
            "/api/seller/dashboard/locked/**",
            "/api/seller/public/**",
            "/api/seller/internal/**"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws ServletException, IOException {

        String uri = req.getRequestURI();

        if (!uri.startsWith("/api/seller/")) {
            chain.doFilter(req, res);
            return;
        }
        for (String pattern : ALLOW_WHEN_LOCKED) {
            if (matcher.match(pattern, uri)) {
                chain.doFilter(req, res);
                return;
            }
        }

        // Lấy Authentication đã được JwtAuthenticationFilter set sẵn
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Nếu chưa auth (permitAll hay anonymous), để filter chain khác xử lý tiếp
        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(String.valueOf(authentication.getPrincipal()))) {
            chain.doFilter(req, res);
            return;
        }

        // Ép kiểu về CustomUserDetails để lấy authId
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CustomUserDetails user)) {
            chain.doFilter(req, res);
            return;
        }

        Long authId = user.getAuthId();

        var restrictedOpt = sellerService.checkStatusByShop(authId);
        if (restrictedOpt.equalsIgnoreCase(String.valueOf(Shop.ShopStatus.pending))) {
            res.setStatus(423);
            res.setContentType("application/json;charset=UTF-8");
            res.getWriter().write("""
    {"code":"SHOP_PENDING_REVIEW","message":"Shop của bạn đang chờ duyệt. Hiện chỉ truy cập được trang Dashboard chờ duyệt."}
    """);
            return;
        }
        else if (restrictedOpt.equalsIgnoreCase(String.valueOf(Shop.ShopStatus.suspended))) {
            res.setStatus(423);
            res.setContentType("application/json;charset=UTF-8");
            res.getWriter().write("""
    {"code":"SHOP_LOCKED","message":"Shop của bạn đang bị khóa. Chỉ truy cập được dashboard khóa."}
    """);
            return;
        }

        chain.doFilter(req, res);
    }
}
