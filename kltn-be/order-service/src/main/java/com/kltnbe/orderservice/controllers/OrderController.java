package com.kltnbe.orderservice.controllers;

import com.kltnbe.orderservice.dtos.DeliveryAddressDTO;
import com.kltnbe.orderservice.dtos.SalesStatsDTO;
import com.kltnbe.orderservice.dtos.req.DashboardStatsResponse;
import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.res.MonthlyRevenueDTO;
import com.kltnbe.orderservice.dtos.res.OrderItemResponse;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import com.kltnbe.orderservice.dtos.res.ResponseDashboardAdmin;
import com.kltnbe.orderservice.entities.MasterOrder;
import com.kltnbe.orderservice.services.OrderService;
import com.kltnbe.security.utils.CustomUserDetails;
import com.kltnbe.security.utils.InternalApi;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
@NoArgsConstructor
public class OrderController {
    @Autowired
    private OrderService orderService;
    private final Logger log = LoggerFactory.getLogger(OrderController.class);
    @PostMapping("/placeOrder")
    ResponseEntity<?> savePlaceOrder(@RequestBody OrderRequest orderRequest) {
        System.out.println("📦 OrderRequest: " + orderRequest);
        return orderService.saveOrder(orderRequest);
    }
    @PostMapping("/placeGuestOrder")
    public ResponseEntity<?> placeOrderForGuest(@RequestBody OrderRequest orderRequest) {
        return orderService.placeGuestOrder(orderRequest);
    }
    @GetMapping("/getOrderByIdUser")
    public ResponseEntity<List<OrderResponse>> listOrderByIdUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long authId =  userDetails.getAuthId();
        return ResponseEntity.ok(orderService.findOrderByUserHeader(authId));
    }
    @PutMapping("/updateMethodOrder")
    public ResponseEntity<String> updateMethodOrder(
            @RequestParam("orderId") Long orderId,
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam String method,
            @RequestBody(required = false) DeliveryAddressDTO deliveryAddressDTO,
            @RequestHeader(value = "Authorization", required = false) String accessToken // ✅ cần để tạo địa chỉ nếu cần
    ) {
        String result;

        switch (method.toLowerCase()) {
            case "cancel":
                result = orderService.cancelOrder(orderId, userDetails.getAuthId());
                break;

            case "updateaddress":
                if (deliveryAddressDTO == null || accessToken == null) {
                    return ResponseEntity.badRequest().body("Thiếu thông tin địa chỉ hoặc accessToken");
                }

                // ✅ gọi logic mới thông minh
                result = orderService.updateOrderAddress(orderId, userDetails.getAuthId(), deliveryAddressDTO, accessToken);
                break;

            default:
                return ResponseEntity.badRequest().body("Phương thức cập nhật không hợp lệ: " + method);
        }

        return ResponseEntity.ok(result);
    }

//    @PutMapping("/updateMethodOrder")
//    public ResponseEntity<String> updateMethodOrder(
//            @RequestParam("orderId") Long orderId,  // ✅ Rõ ràng: là orderId
//            @AuthenticationPrincipal CustomUserDetails userDetails,
//            @RequestParam String method,
//            @RequestBody(required = false) DeliveryAddressDTO deliveryAddressDTO) {
//
//        String result;
//
//        switch (method.toLowerCase()) {
//            case "cancel":
//                result = orderService.cancelOrder(orderId, userDetails.getAuthId());
//                break;
//
//            case "updateaddress":
//                if (deliveryAddressDTO == null) {
//                    return ResponseEntity.badRequest().body("Thiếu thông tin địa chỉ để cập nhật");
//                }
//                result = orderService.updateAddress(orderId, userDetails.getAuthId(), deliveryAddressDTO);
//                break;
//
//            default:
//                return ResponseEntity.badRequest().body("Phương thức cập nhật không hợp lệ: " + method);
//        }
//
//        return ResponseEntity.ok(result);
//    }
    @PutMapping("/updateStatusEvaluate")
    public ResponseEntity<String> updateStatusEvaluate(@RequestParam Long orderItemId) {
        return ResponseEntity.ok(Map.of("message",orderService.updateIsEvaluate(orderItemId)).toString()) ;
    }
    @GetMapping("/getListOrderItemByStore")
    public ResponseEntity<List<OrderItemResponse>> getListOrderItemByStore(@RequestParam Long storeId) {
        return ResponseEntity.ok(orderService.getListOrderItemsByStoreId(storeId));
    }
    @PutMapping("/updateMethodOrderBySeller")
    public ResponseEntity<String> updateMethodOrderBySeller(
            @RequestParam Long orderId,
            @RequestParam Long shopId,
            @RequestParam String method,
            @RequestParam(required = false) String status) {
        String result;
        switch (method.toLowerCase()) {
            case "cancelbyseller":
                result = orderService.cancelBySeller(orderId, shopId);
                break;
            case "updatestatusbyseller":
                result = orderService.updateStatusBySeller(orderId,shopId, status);
                break;
            default:
                return ResponseEntity.badRequest().body("Phương thức cập nhật không hợp lệ: " + method);
        }
        return ResponseEntity.ok(result);
    }
    @PutMapping("/updateMethodOrderByAdmin")
    public ResponseEntity<String> updateMethodOrderByAdmin(
            @RequestParam Long orderId,
            @RequestParam String method,
            @RequestParam(required = false) String status) {
        String result;
        switch (method.toLowerCase()) {
            case "updatestatusbyadmin":
                result = orderService.updateStatusByAdmin(orderId, status);
                break;
            default:
                return ResponseEntity.badRequest().body("Phương thức cập nhật không hợp lệ: " + method);
        }
        return ResponseEntity.ok(result);
    }
    @GetMapping("/dashboardSeller")
    public ResponseEntity<DashboardStatsResponse> getSellerDashboard(
            @RequestParam Long storeId,
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String endDate,
            @RequestParam(required = false) List<String> status) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Timestamp start = startDate != null ? Timestamp.valueOf(LocalDateTime.parse(startDate + "T00:00:00")) : null;
        Timestamp end = endDate != null ? Timestamp.valueOf(LocalDateTime.parse(endDate + "T23:59:59")) : null;

        System.out.println("Fetching dashboard for storeId=" + storeId + ", start=" + start + ", end=" + end + ", statuses=" + status);
        DashboardStatsResponse response = orderService.getSellerDashboard(storeId, page, size, start, end, status);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/dashboardAdmin")
    public ResponseEntity<ResponseDashboardAdmin> getDashboardAdmin(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String endDate,
            @RequestParam(required = false) List<String> status) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Timestamp start = startDate != null ? Timestamp.valueOf(LocalDateTime.parse(startDate + "T00:00:00")) : null;
        Timestamp end = endDate != null ? Timestamp.valueOf(LocalDateTime.parse(endDate + "T23:59:59")) : null;

        System.out.println("Fetching dashboard for " + start + ", end=" + end + ", statuses=" + status);
        ResponseDashboardAdmin response = orderService.getAdminDashboard( page, size, start, end, status);
        return ResponseEntity.ok(response);
    }
        @GetMapping("/getRevenueByStore")
        public ResponseEntity<List<MonthlyRevenueDTO>> getRevenueByStore(@RequestParam Long storeId) {
            List<MonthlyRevenueDTO> revenue = orderService.getRevenueByStore(storeId);
            return ResponseEntity.ok(revenue);
        }

    @GetMapping("/getRevenueByAdmin")
    public ResponseEntity<List<MonthlyRevenueDTO>> getRevenueByAdmin() {
        List<MonthlyRevenueDTO> revenue = orderService.getRevenueByStore();
        return ResponseEntity.ok(revenue);
    }
    @GetMapping("/weekly")
    public Map<String, Object> getWeeklyMetrics() {
        return orderService.getWeeklyMetrics();
    }

    @GetMapping("/monthly")
    public Map<String, Object> getMonthlyMetrics() {
        return orderService.getMonthlyMetrics();
    }

    @GetMapping("/yearly")
    public Map<String, Object> getYearlyMetrics() {
        return orderService.getYearlyMetrics();
    }
    @GetMapping("/today-orders")
    public Long getTodayOrders() {
        return orderService.getTodayOrders();
    }

    @GetMapping("/this-month-orders")
    public Long getThisMonthOrders() {
        return orderService.getThisMonthOrders();
    }

    @GetMapping("/this-month-revenue")
    public BigDecimal getThisMonthRevenue() {
        return orderService.getThisMonthRevenue();
    }

    @GetMapping("/total-revenue")
    public BigDecimal getTotalRevenue() {
        return orderService.getTotalRevenue();
    }
//    @GetMapping("/revenue")
//    public ResponseEntity<Map<String, BigDecimal>> getRevenue(
//            @RequestParam Long storeId,
//            @RequestParam  LocalDate startDate,
//            @RequestParam  LocalDate endDate) {
//
//        // Validate: endDate không được null hoặc trước startDate
//        if (endDate == null || endDate.isBefore(startDate)) {
//            throw new IllegalArgumentException("endDate không được null hoặc trước startDate");
//        }
//
//        // ✅ Cộng thêm 1 ngày vào endDate
//        LocalDate endDateExclusive = endDate.plusDays(1);
//
//        // Convert sang Timestamp
//        Timestamp start = Timestamp.valueOf(startDate.atStartOfDay());
//        Timestamp end = Timestamp.valueOf(endDateExclusive.atStartOfDay()); // Lấy đến đầu ngày kế tiếp
//
//        System.out.printf("Fetching revenue for storeId=%d, start=%s, end=%s%n",
//                storeId, start, end);
//
//        BigDecimal revenue = orderService.getRevenueByDateRange(storeId, start, end);
//
//        Map<String, BigDecimal> response = new HashMap<>();
//        response.put("revenue", revenue != null ? revenue : BigDecimal.ZERO);
//
//        return ResponseEntity.ok(response);
//    }







//     @PutMapping("/updateMethodOrder")
//    public ResponseEntity<String> updateMethodOrder(
//            @RequestParam Long orderId,
//            @AuthenticationPrincipal CustomUserDetails userDetails,
//            @RequestParam String method,
//            @RequestBody(required = false) DeliveryAddressDTO deliveryAddressDTO) {
//        String result;
//        log.debug("authId: {}", userDetails.getAuthId());
//        log.debug("order userId: {}", orderId);
//
//        switch (method.toLowerCase()) {
//            case "cancel":
//                result = orderService.cancelOrder(orderId, userDetails.getAuthId());
//                break;
//            case "updateaddress":
//                if (deliveryAddressDTO == null) {
//                    return ResponseEntity.badRequest().body("Thiếu thông tin địa chỉ để cập nhật");
//                }
//                result = orderService.updateAddress(orderId, userDetails.getAuthId(), deliveryAddressDTO);
//                break;
//            default:
//                return ResponseEntity.badRequest().body("Phương thức cập nhật không hợp lệ: " + method);
//        }
//        return ResponseEntity.ok(result);
//    }
////    @GetMapping("/user")
////    public Page<OrderResponse> getOrdersByAccessToken(
////            @RequestHeader("Authorization") String token,
////            @RequestParam(defaultValue = "0") int page,
////            @RequestParam(defaultValue = "10") int size) {
////        return orderService.getOrdersByAccessToken(token, page, size);
////    }
////    // ✅ 1. Xem chi tiết đơn hàng
////    @GetMapping("/{orderId}")
////    public ResponseEntity<?> getOrderDetail(
////            @PathVariable Long orderId,
////            @RequestHeader("Authorization") String token) {
////        return orderService.getOrderDetail(orderId, token);
////    }
//
//    @PostMapping("/cancel/{orderId}")
//    public ResponseEntity<?> cancelOrder(
//            @PathVariable Long orderId,
//            @RequestHeader("Authorization") String accessToken
//    ) {
//        return orderService.cancelOrder(orderId, accessToken);
//    }
//
//    // 📌 Trả hàng với lý do
//    @PostMapping("/return/{orderId}")
//    public ResponseEntity<?> returnOrder(
//            @PathVariable Long orderId,
//            @RequestParam("reason") String reason,
//            @RequestHeader("Authorization") String accessToken
//    ) {
//        return orderService.requestReturn(orderId, reason, accessToken);
//    }
////    @GetMapping("/statistics/sales/me")
////    public ResponseEntity<List<SalesStatsDTO>> getSalesStatsByToken(
////            @RequestHeader("Authorization") String token,
////            @RequestParam(defaultValue = "month") String type) {
////        List<SalesStatsDTO> stats = orderService.getSalesStatsByToken(token, type);
////        return ResponseEntity.ok(stats);
////    }
////    @InternalApi
////    @GetMapping("/dashboardSeller")
////    public ResponseEntity<DashboardStatsResponse> getSellerDashboard(@RequestParam Long storeId, @RequestParam int page, @RequestParam int size) {
////        DashboardStatsResponse response = orderService.getSellerDashboard(storeId,page,size);
////        return ResponseEntity.ok(response);
////    }
////    @GetMapping("/getRevenueByStore")
////    public ResponseEntity<List<MonthlyRevenueDTO>> getRevenueByStore(@RequestParam Long storeId) {
////        List<MonthlyRevenueDTO> revenue = orderService.getRevenueByStore(storeId);
////        return ResponseEntity.ok(revenue);
////    }
}