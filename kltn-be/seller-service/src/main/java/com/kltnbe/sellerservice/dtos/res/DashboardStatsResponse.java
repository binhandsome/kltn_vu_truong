package com.kltnbe.sellerservice.dtos.res;

import com.kltnbe.sellerservice.dtos.res.OrderSummary;
import com.kltnbe.sellerservice.dtos.res.ProductSummary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardStatsResponse {
    private long followers;
    private long ordersToday;
    private long ordersThisMonth;
    private BigDecimal totalRevenue;
    private List<OrderSummary> recentOrders;
    private int totalPages;  // 🔥 để phân trang

    // 📦 Sản phẩm bán chạy/top sản phẩm
    private List<ProductSummary> topProducts;

}
