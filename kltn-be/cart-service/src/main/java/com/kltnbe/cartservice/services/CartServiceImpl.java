package com.kltnbe.cartservice.services;

import com.kltnbe.cartservice.dtos.*;
import com.kltnbe.cartservice.dtos.req.*;
import com.kltnbe.cartservice.dtos.res.CartResponse;
import com.kltnbe.cartservice.dtos.res.CheckoutResponse;
import com.kltnbe.cartservice.dtos.res.OrderResponse;
import com.kltnbe.cartservice.dtos.res.PaymentResponse;
import com.kltnbe.cartservice.entities.Cart;
import com.kltnbe.cartservice.entities.CartItem;
import com.kltnbe.cartservice.clients.UserClient;
import com.kltnbe.cartservice.clients.ProductClient;
import com.kltnbe.cartservice.clients.AddressClient;
import com.kltnbe.cartservice.repositories.CartItemRepository;
import com.kltnbe.cartservice.repositories.CartRepository;
import com.kltnbe.cartservice.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    @LoadBalanced
    private RestTemplate restTemplate;
    @Autowired
    private UserClient userClient;
    @Autowired
    private ProductClient productClient;
    @Autowired
    private AddressClient addressClient;

    @Override
    public CartResponse addToCart(String username, CartItemRequest request) {
        UserDTO user = userClient.findUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("Người dùng không tồn tại");
        }

        ProductDTO product = productClient.getProductByAsin(request.getProductAsin());
        if (product == null) {
            throw new RuntimeException("Sản phẩm không tồn tại");
        }

        ProductVariantDTO variant = null;
        if (request.getVariantId() != null) {
            variant = productClient.getVariantById(request.getVariantId());
            if (variant == null || !variant.getProductAsin().equals(request.getProductAsin())) {
                throw new RuntimeException("Biến thể không tồn tại hoặc không thuộc sản phẩm");
            }
        }

        int stockQuantity = product.getStockQuantity();
        if (variant != null && variant.getVariantPrice() != null) {
            stockQuantity = variant.getStockQuantity() != null ? variant.getStockQuantity() : stockQuantity;
        }
        if (request.getQuantity() > stockQuantity) {
            throw new RuntimeException("Số lượng yêu cầu vượt quá tồn kho: " + stockQuantity);
        }

        Cart cart = cartRepository.findByUserId(user.getUserId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(user.getUserId());
                    return cartRepository.save(newCart);
                });

        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProductAsin().equals(request.getProductAsin()) &&
                        (item.getVariantId() == null ? request.getVariantId() == null : item.getVariantId().equals(request.getVariantId())))
                .findFirst()
                .orElse(null);

        BigDecimal unitPrice = product.getProductPrice();
        if (variant != null && variant.getVariantPrice() != null) {
            unitPrice = variant.getVariantPrice();
        }

        if (existingItem != null) {
            int newQuantity = existingItem.getQuantity() + request.getQuantity();
            if (newQuantity > stockQuantity) {
                throw new RuntimeException("Số lượng yêu cầu vượt quá tồn kho: " + stockQuantity);
            }
            existingItem.setQuantity(newQuantity);
            cartItemRepository.save(existingItem);
        } else {
            if (request.getQuantity() <= 0) {
                throw new RuntimeException("Số lượng phải lớn hơn 0 khi thêm sản phẩm mới");
            }
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProductAsin(request.getProductAsin());
            cartItem.setVariantId(request.getVariantId());
            cartItem.setQuantity(request.getQuantity());
            cartItem.setUnitPrice(unitPrice);
            cart.getItems().add(cartItem);
            cartItemRepository.save(cartItem);
        }

        cartRepository.save(cart);
        return mapToCartResponse(cart);
    }

    @Override
    public CartResponse getCart(String username) {
        UserDTO user = userClient.findUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("Người dùng không tồn tại");
        }

        Cart cart = cartRepository.findByUserId(user.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng cho người dùng: " + username));
        return mapToCartResponse(cart);
    }

    @Override
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng cho người dùng: " + userId));
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    @Override
    public CartResponse updateCartItem(String username, CartItemRequest request) {
        UserDTO user = userClient.findUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("Người dùng không tồn tại");
        }

        Cart cart = cartRepository.findByUserId(user.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng cho người dùng: " + username));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getProductAsin().equals(request.getProductAsin()) &&
                        (item.getVariantId() == null ? request.getVariantId() == null : item.getVariantId().equals(request.getVariantId())))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Sản phẩm không có trong giỏ hàng"));

        ProductDTO product = productClient.getProductByAsin(request.getProductAsin());
        if (product == null) {
            throw new RuntimeException("Sản phẩm không tồn tại");
        }

        ProductVariantDTO variant = null;
        if (request.getVariantId() != null) {
            variant = productClient.getVariantById(request.getVariantId());
            if (variant == null || !variant.getProductAsin().equals(request.getProductAsin())) {
                throw new RuntimeException("Biến thể không tồn tại hoặc không thuộc sản phẩm");
            }
        }

        int stockQuantity = product.getStockQuantity();
        if (variant != null && variant.getVariantPrice() != null) {
            stockQuantity = variant.getStockQuantity() != null ? variant.getStockQuantity() : stockQuantity;
        }
        if (request.getQuantity() > stockQuantity) {
            throw new RuntimeException("Số lượng yêu cầu vượt quá tồn kho: " + stockQuantity);
        }

        if (request.getQuantity() <= 0) {
            cart.getItems().remove(cartItem);
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(request.getQuantity());
            cartItemRepository.save(cartItem);
        }

        cartRepository.save(cart);
        return mapToCartResponse(cart);
    }

    @Override
    public CartResponse removeCartItem(String username, Long cartItemId) {
        UserDTO user = userClient.findUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("Người dùng không tồn tại");
        }

        Cart cart = cartRepository.findByUserId(user.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng cho người dùng: " + username));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getCartItemId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Sản phẩm không có trong giỏ hàng"));

        cart.getItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
        cartRepository.save(cart);

        return mapToCartResponse(cart);
    }

    @Override
    public CheckoutResponse checkout(String username, PaymentRequest paymentRequest) {
        UserDTO user = userClient.findUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("Người dùng không tồn tại");
        }

        Cart cart = cartRepository.findByUserId(user.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng cho người dùng: " + username));
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Giỏ hàng trống");
        }

        BigDecimal totalAmount = cart.getItems().stream()
                .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        AddressDTO primaryAddress = addressClient.getPrimaryAddress(user.getUserId());
        if (primaryAddress == null) {
            throw new RuntimeException("Không tìm thấy địa chỉ giao hàng mặc định");
        }

        TransactionRequest transactionRequest = new TransactionRequest();
        transactionRequest.setPaymentMethod(paymentRequest.getPaymentMethod());
        transactionRequest.setAmount(totalAmount);
        transactionRequest.setStatus("pending");
        String transactionServiceUrl = "http://localhost:8084/api/transactions";
        TransactionDTO transaction = restTemplate.postForObject(transactionServiceUrl, transactionRequest, TransactionDTO.class);

        DeliveryInfoRequest deliveryRequest = new DeliveryInfoRequest();
        deliveryRequest.setAddressId(primaryAddress.getAddressId());
        deliveryRequest.setShippingMethodId(1L);
        deliveryRequest.setShippingFee(BigDecimal.valueOf(10.00));
        deliveryRequest.setDeliveryStatus("pending");
        deliveryRequest.setEstimatedDeliveryDate(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000));
        String deliveryServiceUrl = "http://localhost:8085/api/delivery-info";
        DeliveryInfoDTO deliveryInfo = restTemplate.postForObject(deliveryServiceUrl, deliveryRequest, DeliveryInfoDTO.class);

        paymentRequest.setAmount(totalAmount);
        paymentRequest.setShippingAddress(primaryAddress.getDeliveryAddress());
        String paymentServiceUrl = "http://localhost:8084/api/payments/process";
        PaymentResponse paymentResponse = restTemplate.postForObject(paymentServiceUrl, paymentRequest, PaymentResponse.class);
        if (!"SUCCESS".equals(paymentResponse.getStatus())) {
            throw new RuntimeException("Thanh toán thất bại: " + paymentResponse.getMessage());
        }

        transaction.setOrderId(null);
        transaction.setStatus("completed");
        restTemplate.put(transactionServiceUrl + "/" + transaction.getTransactionId(), transaction, TransactionDTO.class);

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setUserId(user.getUserId());
        orderRequest.setTotalAmount(totalAmount);
        orderRequest.setOrderStatus("pending");
        orderRequest.setCreatedAt(new Date());
        orderRequest.setUpdatedAt(new Date());
        orderRequest.setDeliveryId(deliveryInfo.getDeliveryId());
        orderRequest.setTransactionId(transaction.getTransactionId());
        String orderServiceUrl = "http://localhost:8085/api/orders";
        OrderResponse orderResponse = restTemplate.postForObject(orderServiceUrl, orderRequest, OrderResponse.class);

        transaction.setOrderId(orderResponse.getOrderId());
        restTemplate.put(transactionServiceUrl + "/" + transaction.getTransactionId(), transaction, TransactionDTO.class);

        deliveryInfo.setOrderId(orderResponse.getOrderId());
        restTemplate.put(deliveryServiceUrl + "/" + deliveryInfo.getDeliveryId(), deliveryInfo, DeliveryInfoDTO.class);

        cart.getItems().clear();
        cartRepository.save(cart);

        CheckoutResponse response = new CheckoutResponse();
        response.setStatus("SUCCESS");
        response.setTotalAmount(totalAmount);
        response.setOrderId(orderResponse.getOrderId());
        response.setTransactionId(transaction.getTransactionId());
        response.setDeliveryId(deliveryInfo.getDeliveryId());
        return response;
    }

    private CartResponse mapToCartResponse(Cart cart) {
        CartResponse response = new CartResponse();
        response.setCartId(cart.getCartId());
        response.setUserId(cart.getUserId());
        response.setItems(cart.getItems().stream().map(item -> {
            CartItemDTO itemDTO = new CartItemDTO();
            itemDTO.setCartItemId(item.getCartItemId());
            itemDTO.setProductAsin(item.getProductAsin());
            itemDTO.setVariantId(item.getVariantId());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setUnitPrice(item.getUnitPrice());
            return itemDTO;
        }).collect(Collectors.toList()));
        return response;
    }
}

