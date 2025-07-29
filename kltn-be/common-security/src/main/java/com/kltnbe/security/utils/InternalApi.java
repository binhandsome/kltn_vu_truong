package com.kltnbe.security.utils;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE}) // có thể áp dụng cho method hoặc class
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface InternalApi {

}