package com.kltnbe.security.utils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Aspect
@Component
@RequiredArgsConstructor
public class InternalApiAspect {

    private final HttpServletRequest request;

    @Value("${internal.secret}")
    private String internalSecretKey;

    @Before("@within(com.kltnbe.security.utils.InternalApi) || @annotation(com.kltnbe.security.ul.InternalApi)")
    public void checkInternalSecret() {
        String secret = request.getHeader("X-Internal-Secret");
        if (secret == null || !secret.equals(internalSecretKey)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "❌ Forbidden: Invalid internal secret");
        }
    }
}