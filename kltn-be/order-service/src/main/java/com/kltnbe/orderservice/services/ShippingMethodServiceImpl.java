package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.entities.ShippingMethod;
import com.kltnbe.orderservice.repositories.ShippingMethodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

// ShippingMethodServiceImpl.java
@Service
public class ShippingMethodServiceImpl implements ShippingMethodService {
    private final ShippingMethodRepository shippingMethodRepository;

    public ShippingMethodServiceImpl(ShippingMethodRepository repo) {
        this.shippingMethodRepository = repo;
    }

    @Override
    public List<ShippingMethod> getAllShippingMethods() {
        return shippingMethodRepository.findAllByIsActiveTrue();
    }
}
