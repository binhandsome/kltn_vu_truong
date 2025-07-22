package com.kltnbe.orderservice.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "shipping_methods")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "method_name", nullable = false)
    private String methodName;

    private String description;

    @Column(name = "estimated_days")
    private Integer estimatedDays;

    private Double cost;

    @Column(name = "is_active")
    private Boolean isActive = true;
}
