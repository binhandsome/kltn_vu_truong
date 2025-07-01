package com.kltnbe.userservice.helpers;

import com.kltnbe.userservice.dtos.req.ForgotPasswordOtpRequest;
import com.kltnbe.userservice.dtos.req.RequestInfomation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "email-service")
public interface EmailServiceProxy {
    @PostMapping("/api/email/sendEmailRegister")
    ResponseEntity<String> sendEmailRegister(@RequestBody RequestInfomation requestInfomation);
    @PostMapping("/api/email/checkOTP")
    ResponseEntity<String> checkOTP(@RequestBody RequestInfomation requestInfomation);
    @PostMapping("/api/email/sendOtpResetPassword")
    ResponseEntity<String> sendOtpResetPassword(@RequestBody ForgotPasswordOtpRequest request);

}