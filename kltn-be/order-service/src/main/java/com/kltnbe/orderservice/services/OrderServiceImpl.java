package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.req.PaymentRequest;
import com.kltnbe.orderservice.entities.Order;
import com.kltnbe.orderservice.entities.OrderItem;
import com.kltnbe.orderservice.enums.OrderStatus;
import com.kltnbe.orderservice.helpers.PaymentServiceProxy;
import com.kltnbe.orderservice.helpers.UserServiceProxy;
import com.kltnbe.orderservice.repositories.OrderItemRepository;
import com.kltnbe.orderservice.repositories.OrderRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private final OrderRepository orderRepository;
    private final UserServiceProxy userServiceProxy;
    @Autowired
    private final PaymentServiceProxy paymentServiceProxy;
    private final OrderItemRepository orderItemRepository;

    @Override
    public ResponseEntity<?> saveOrder(OrderRequest orderRequest) {
        System.out.print(orderRequest.getAddressId() + " "+ orderRequest.getTotalPrice() + " "+ orderRequest.getOrderNotes() + "tesstsysit");
        Long idUser = userServiceProxy.findUserIdByAccessToken(orderRequest.getAccessToken());
        Order order = Order.builder().userId(idUser)
                .addressId(orderRequest.getAddressId())
                .orderNotes(orderRequest.getOrderNotes())
                .totalPrice(orderRequest.getTotalPrice())
                .status(String.valueOf(OrderStatus.pending))
                .build();
        Order orderSave = orderRepository.save(order);
        List<OrderItem> orderItems = orderRequest.getOrderItemRequests()
                .stream()
                .map(itemReq -> OrderItem.builder()
                        .order(orderSave)
                        .productId(itemReq.getProductId())
                        .unitPrice(itemReq.getUnitPrice())
                        .color(itemReq.getColor())
                        .size(itemReq.getSize())
                        .quantity(itemReq.getQuantity())
                        .build())
                .toList();
        orderItemRepository.saveAll(orderItems);
        PaymentRequest paymentRequest = new PaymentRequest();

        paymentRequest.setOrderId(order.getOrderId());
        paymentRequest.setMethodPayment(orderRequest.getSelectBank());
        paymentRequest.setAmount(orderRequest.getTotalPrice());
        ResponseEntity<?> responseEntity = paymentServiceProxy.savePayment(paymentRequest);
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            System.out.println("✅ Payment saved: " + responseEntity.getBody());
        } else {
            System.out.println("❌ Payment failed: " + responseEntity.getStatusCode());
        }
        return ResponseEntity.ok(Map.of("message", "Đặt hàng thành công"));
    }
}