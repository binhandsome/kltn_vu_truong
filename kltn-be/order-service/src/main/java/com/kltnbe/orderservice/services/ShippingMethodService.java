package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.entities.ShippingMethod;

import java.util.List;

// ShippingMethodService.java
public interface ShippingMethodService {
    List<ShippingMethod> getAllShippingMethods();
}
