package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.OrderDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "order-service", url = "http://localhost:8085")
public interface OrderClient {
    @GetMapping("/api/orders")
    List<OrderDTO> getAllOrders();
}