package com.kltnbe.adminservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyRevenueDTO {
    private int month;          // Tháng (1 - 12)
    private BigDecimal revenue; // Tổng doanh thu của tháng
}