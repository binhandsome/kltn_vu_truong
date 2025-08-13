package com.kltn.searchservice.helpers;

import com.kltn.searchservice.dtos.TopProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@FeignClient(name = "order-service")
public interface OrderServiceProxy {
        @GetMapping("/api/orders/sold-count")
        Map<String, Long> getSoldCounts(@RequestParam("productIds") String productIdsCsv,
                                        @RequestParam(value="storeId", required=false) Long storeId,
                                        @RequestParam(value="statuses", required=false) String statusesCsv);

        @GetMapping("/api/orders/top-products")
        List<TopProductDTO> getTopProducts(@RequestParam int size,
                                           @RequestParam(required=false) Integer days,
                                           @RequestParam(required=false) String statuses,
                                           @RequestParam(required=false) Long storeId);
}
