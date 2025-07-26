package com.kltnbe.orderservice.dtos;

public class SalesStatsDTO {
    private String label;
    private Double total;

    public SalesStatsDTO(String label, Double total) {
        this.label = label;
        this.total = total;
    }

    public String getLabel() {
        return label;
    }

    public Double getTotal() {
        return total;
    }
}
