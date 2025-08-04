package com.kltnbe.orderservice.dtos.res;

import com.kltnbe.orderservice.dtos.MasterOrderSummary;
import com.kltnbe.orderservice.dtos.req.ProductSummary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@Builder
@Data
public class ResponseDashboardAdmin {
    private long ordersToday;
    private long ordersThisMonth;
    private BigDecimal totalRevenue;
    private BigDecimal thisMonthRevenue; // Thêm: Doanh thu tháng này
    private List<MasterOrderSummary> recentOrders;
    private int totalPages;
    private List<ProductSummary> topProducts;
    private List<MonthlyRevenue> revenueByYear; // Thêm: Doanh thu theo tháng trong năm

    // Inner class cho revenueByYear
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MonthlyRevenue {
        private int month;
        private BigDecimal revenue;
    }
}
