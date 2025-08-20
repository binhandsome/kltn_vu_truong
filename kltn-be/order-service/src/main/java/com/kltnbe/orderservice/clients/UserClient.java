//package com.kltnbe.orderservice.clients;
//
//import com.kltnbe.orderservice.dtos.UserDTO;
//import com.kltnbe.orderservice.dtos.req.GuestAddressRequest;
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestParam;
//
//@FeignClient(name = "user-service", contextId = "userClient")
//public interface UserClient {
//    @GetMapping("/api/users/find")
//    UserDTO findUserByUsername(@RequestParam("username") String username);
//
//
//}