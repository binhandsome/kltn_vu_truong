package com.kltnbe.cartservice.services;

import com.kltnbe.cartservice.dtos.CartItemDto;
import com.kltnbe.cartservice.dtos.CartRedisDto;
import com.kltnbe.cartservice.dtos.req.CartRequest;
import com.kltnbe.cartservice.dtos.res.CartResponse;
import com.kltnbe.cartservice.utils.JwtUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    private final RedisTemplate<String, CartRedisDto> cartRedisDtoRedisTemplate;
    private final JwtUtil jwtUtil;

    public CartServiceImpl(RedisTemplate<String, CartRedisDto> cartRedisDtoRedisTemplate, JwtUtil jwtUtil) {
        this.cartRedisDtoRedisTemplate = cartRedisDtoRedisTemplate;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public CartResponse addItemToCart(CartRequest cartRequest) {
        System.out.println("Nhận được request trong service: " + cartRequest);

        // Validate CartRequest
        if (cartRequest.getAsin() == null || cartRequest.getAsin().isEmpty()) {
            System.out.println("Lỗi: ASIN trong CartRequest là null hoặc rỗng");
            throw new IllegalArgumentException("ASIN không được null hoặc rỗng");
        }

        String key;
        String setUser;
        String generatedCartId = null;

        if (cartRequest.getToken() != null && !cartRequest.getToken().isEmpty()) {
            String username = jwtUtil.getUsernameFromToken(cartRequest.getToken());
            key = "cart:" + username;
            setUser = username;
            System.out.println("Xử lý với token, username: " + username);
        } else if (cartRequest.getCartId() != null && !cartRequest.getCartId().isEmpty()) {
            key = "cart:" + cartRequest.getCartId();
            setUser = "guest";
            generatedCartId = cartRequest.getCartId();
            System.out.println("Xử lý với cartId: " + cartRequest.getCartId());
        } else {
            String cartId = UUID.randomUUID().toString();
            key = "cart:" + cartId;
            setUser = "guest";
            generatedCartId = cartId;
            System.out.println("Tạo mới cartId: " + cartId);
        }
        CartRedisDto cartRedisDto = cartRedisDtoRedisTemplate.opsForValue().get(key);
        if (cartRedisDto == null) {
            cartRedisDto = new CartRedisDto();
            cartRedisDto.setUsername(setUser);
            cartRedisDto.setItems(new ArrayList<>());
            System.out.println("Tạo mới CartRedisDto cho key: " + key);
        } else {
            System.out.println("CartRedisDto hiện có: " + cartRedisDto);
            System.out.println("Danh sách items: " + cartRedisDto.getItems());
        }

        Optional<CartItemDto> existingItemOpt = cartRedisDto.getItems().stream()
                .filter(item -> Objects.equals(item.getAsin(), cartRequest.getAsin()))
                .findFirst();

        if (existingItemOpt.isPresent()) {
            CartItemDto existingItem = existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity() + cartRequest.getQuantity());
            BigDecimal newPrice = existingItem.getPrice().add(cartRequest.getPrice());
            existingItem.setPrice(newPrice);
            System.out.println("Cập nhật item hiện có: " + existingItem);
        } else {
            CartItemDto cartItemDto = new CartItemDto();
            cartItemDto.setAsin(cartRequest.getAsin());
            cartItemDto.setQuantity(cartRequest.getQuantity());
            cartItemDto.setPrice(cartRequest.getPrice());
            cartItemDto.setSize(cartRequest.getSize());
            cartItemDto.setNameColor(cartRequest.getNameColor());
            cartRedisDto.getItems().add(cartItemDto);
            System.out.println("Thêm item mới: " + cartItemDto);
        }

        cartRedisDtoRedisTemplate.opsForValue().set(key, cartRedisDto);
        System.out.println("Đã lưu CartRedisDto vào Redis với key: " + key);

        int totalQuantity = cartRedisDto.getItems().stream()
                .mapToInt(CartItemDto::getQuantity)
                .sum();

        BigDecimal totalPrice = cartRedisDto.getItems().stream()
                .filter(item -> item.getPrice() != null)
                .map(CartItemDto::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        CartResponse response = new CartResponse();
        response.setMessage("Thêm giỏ hàng thành công");
        response.setCartId(generatedCartId);
        response.setTotalQuantity(totalQuantity);
        response.setTotalPrice(totalPrice);
        response.setItems(cartRedisDto.getItems());
        System.out.println("Trả về response: " + response);

        return response;
    }

    @Override
    public CartResponse getItemCart(CartRequest cartRequest) {
        String key = null;
        CartRedisDto cartRedisDto = null;

        // ✅ Ưu tiên theo token
        if (cartRequest.getToken() != null && !cartRequest.getToken().isEmpty()) {
            try {
                String username = jwtUtil.getUsernameFromToken(cartRequest.getToken());
                key = "cart:" + username;
                cartRedisDto = cartRedisDtoRedisTemplate.opsForValue().get(key);
                if (cartRedisDto != null && cartRedisDto.getItems() != null && !cartRedisDto.getItems().isEmpty()) {
                    return buildCartResponse(cartRedisDto, "Lấy giỏ hàng theo token thành công", null);
                }
            } catch (Exception e) {
                System.err.println("❌ Token không hợp lệ: " + e.getMessage());
            }
        }

        // ✅ Nếu không có token hoặc không tìm thấy, thử cartId
        if (cartRequest.getCartId() != null && !cartRequest.getCartId().isEmpty()) {
            key = "cart:" + cartRequest.getCartId();
            cartRedisDto = cartRedisDtoRedisTemplate.opsForValue().get(key);
            if (cartRedisDto != null && cartRedisDto.getItems() != null && !cartRedisDto.getItems().isEmpty()) {
                return buildCartResponse(cartRedisDto, "Lấy giỏ hàng theo cartId thành công", cartRequest.getCartId());
            }
        }

        // ❌ Không có giỏ hàng nào
        CartResponse empty = new CartResponse();
        empty.setItems(new ArrayList<>());
        empty.setTotalPrice(BigDecimal.ZERO);
        empty.setTotalQuantity(0);
        empty.setMessage("Không tìm thấy giỏ hàng");
        return empty;
    }



    private CartResponse buildCartResponse(CartRedisDto cartRedisDto, String message, String cartId) {
        CartResponse cartResponse = new CartResponse();
        int totalQuantity = cartRedisDto.getItems().stream()
                .mapToInt(CartItemDto::getQuantity)
                .sum();

        BigDecimal totalPrice = cartRedisDto.getItems().stream()
                .filter(item -> item.getPrice() != null && item.getQuantity() > 0)
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cartResponse.setItems(cartRedisDto.getItems());
        cartResponse.setTotalQuantity(totalQuantity);
        cartResponse.setTotalPrice(totalPrice);
        cartResponse.setMessage(message);
        cartResponse.setCartId(cartId);
        return cartResponse;
    }
    @Override
    public CartResponse removeItemFromCart(CartRequest cartRequest) {
        String key;
        if (cartRequest.getToken() != null && !cartRequest.getToken().isEmpty()) {
            String username = jwtUtil.getUsernameFromToken(cartRequest.getToken());
            key = "cart:" + username;
        } else if (cartRequest.getCartId() != null && !cartRequest.getCartId().isEmpty()) {
            key = "cart:" + cartRequest.getCartId();
        } else {
            throw new IllegalArgumentException("Không thể xác định người dùng hoặc giỏ hàng");
        }

        CartRedisDto cartRedisDto = cartRedisDtoRedisTemplate.opsForValue().get(key);
        if (cartRedisDto == null) {
            throw new NoSuchElementException("Không tìm thấy giỏ hàng");
        }

        boolean removed = cartRedisDto.getItems().removeIf(item -> Objects.equals(item.getAsin(), cartRequest.getAsin()));
        if (!removed) {
            throw new NoSuchElementException("Không tìm thấy sản phẩm để xoá");
        }

        // ✅ Nếu sau khi xoá thì giỏ hàng rỗng → xoá luôn khỏi Redis
        if (cartRedisDto.getItems().isEmpty()) {
            cartRedisDtoRedisTemplate.delete(key);

            CartResponse emptyResponse = new CartResponse();
            emptyResponse.setMessage("Giỏ hàng hiện tại không còn sản phẩm");
            emptyResponse.setTotalQuantity(0);
            emptyResponse.setTotalPrice(BigDecimal.ZERO);
            emptyResponse.setItems(new ArrayList<>());
            return emptyResponse;
        }

        // ✅ Nếu vẫn còn item → cập nhật lại vào Redis
        cartRedisDtoRedisTemplate.opsForValue().set(key, cartRedisDto);
        return buildCartResponse(cartRedisDto, "Đã xoá sản phẩm khỏi giỏ hàng", cartRequest.getCartId());
    }

    @Override
    public CartResponse updateItemQuantity(CartRequest cartRequest) {
        String key;

        // ✅ Xác định Redis key dựa vào token hoặc cartId
        if (cartRequest.getToken() != null && !cartRequest.getToken().isEmpty()) {
            String username = jwtUtil.getUsernameFromToken(cartRequest.getToken());
            key = "cart:" + username;
        } else if (cartRequest.getCartId() != null && !cartRequest.getCartId().isEmpty()) {
            key = "cart:" + cartRequest.getCartId();
        } else {
            throw new IllegalArgumentException("Không thể xác định người dùng hoặc giỏ hàng");
        }

        // ✅ Lấy giỏ hàng từ Redis
        CartRedisDto cartRedisDto = cartRedisDtoRedisTemplate.opsForValue().get(key);
        if (cartRedisDto == null) {
            throw new NoSuchElementException("Không tìm thấy giỏ hàng");
        }

        // ✅ Tìm sản phẩm trong giỏ
        Optional<CartItemDto> existingItemOpt = cartRedisDto.getItems().stream()
                .filter(item -> Objects.equals(item.getAsin(), cartRequest.getAsin()))
                .findFirst();

        if (existingItemOpt.isEmpty()) {
            throw new NoSuchElementException("Không tìm thấy sản phẩm để cập nhật");
        }

        // ✅ Cập nhật số lượng (không sửa lại giá)
        CartItemDto item = existingItemOpt.get();
        if (cartRequest.getQuantity() != 0) {
            item.setQuantity(cartRequest.getQuantity());
        }
        if (cartRequest.getSize() != null ) {
            item.setSize(cartRequest.getSize());
        }
        if (cartRequest.getNameColor() != null ) {
            item.setNameColor(cartRequest.getNameColor());
        }

        // ✅ Lưu lại giỏ hàng vào Redis
        cartRedisDtoRedisTemplate.opsForValue().set(key, cartRedisDto);

        // ✅ Trả về thông tin giỏ hàng sau cập nhật
        return buildCartResponse(cartRedisDto, "Cập nhật sản phẩm thành công", cartRequest.getCartId());
    }

    @Override
    public CartResponse clearCart(CartRequest cartRequest) {
        String key;
        if (cartRequest.getToken() != null && !cartRequest.getToken().isEmpty()) {
            String username = jwtUtil.getUsernameFromToken(cartRequest.getToken());
            key = "cart:" + username;
        } else if (cartRequest.getCartId() != null && !cartRequest.getCartId().isEmpty()) {
            key = "cart:" + cartRequest.getCartId();
        } else {
            throw new IllegalArgumentException("Không thể xác định người dùng hoặc giỏ hàng");
        }

        cartRedisDtoRedisTemplate.delete(key);

        CartResponse response = new CartResponse();
        response.setMessage("Đã xoá toàn bộ giỏ hàng");
        response.setTotalQuantity(0);
        response.setTotalPrice(BigDecimal.ZERO);
        response.setItems(new ArrayList<>());

        return response;
    }

    @Override
    public CartResponse getCartByID(String tokenOrCartId, List<String> asin) {
        String key;

        // 🔐 Kiểm tra có đúng định dạng JWT không (phải có 2 dấu chấm)
        boolean isJwt = tokenOrCartId != null && tokenOrCartId.split("\\.").length == 3;

        if (isJwt && jwtUtil.validateToken(tokenOrCartId)) {
            String username = jwtUtil.getUsernameFromToken(tokenOrCartId);
            key = "cart:" + username;
        } else {
            key = "cart:" + tokenOrCartId;
        }

        CartRedisDto cartRedisDto = cartRedisDtoRedisTemplate.opsForValue().get(key);
        if (cartRedisDto == null) {
            CartResponse empty = new CartResponse();
            empty.setItems(new ArrayList<>());
            empty.setMessage("Không tìm thấy giỏ hàng");
            return empty;
        }

        List<CartItemDto> filteredItems = cartRedisDto.getItems().stream()
                .filter(item -> asin.contains(item.getAsin()))
                .collect(Collectors.toList());

        BigDecimal totalPrice = filteredItems.stream()
                .filter(i -> i.getPrice() != null)
                .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        CartResponse response = new CartResponse();
        response.setItems(filteredItems);
        response.setCartId(tokenOrCartId);
        response.setTotalPrice(totalPrice);
        response.setTotalQuantity(filteredItems.stream().mapToInt(CartItemDto::getQuantity).sum());
        response.setMessage("Lấy giỏ hàng thành công");

        return response;
    }


    @Override
    public CartResponse removeMultipleItemsFromCart(CartRequest cartRequest, List<String> asinList) {
        String key;
        if (cartRequest.getToken() != null && !cartRequest.getToken().isEmpty()) {
            String username = jwtUtil.getUsernameFromToken(cartRequest.getToken());
            key = "cart:" + username;
        } else if (cartRequest.getCartId() != null && !cartRequest.getCartId().isEmpty()) {
            key = "cart:" + cartRequest.getCartId();
        } else {
            throw new IllegalArgumentException("Không thể xác định người dùng hoặc giỏ hàng");
        }

        CartRedisDto cartRedisDto = cartRedisDtoRedisTemplate.opsForValue().get(key);
        if (cartRedisDto == null) {
            throw new NoSuchElementException("Không tìm thấy giỏ hàng");
        }

        // ❌ Nếu không còn item nào thì xoá luôn khỏi Redis
        boolean removed = cartRedisDto.getItems().removeIf(item -> asinList.contains(item.getAsin()));
        if (!removed) {
            throw new NoSuchElementException("Không có sản phẩm nào để xoá");
        }

        if (cartRedisDto.getItems().isEmpty()) {
            cartRedisDtoRedisTemplate.delete(key);

            CartResponse emptyResponse = new CartResponse();
            emptyResponse.setMessage("Giỏ hàng hiện tại không còn sản phẩm sau khi xoá");
            emptyResponse.setTotalQuantity(0);
            emptyResponse.setTotalPrice(BigDecimal.ZERO);
            emptyResponse.setItems(new ArrayList<>());
            return emptyResponse;
        }

        cartRedisDtoRedisTemplate.opsForValue().set(key, cartRedisDto);
        return buildCartResponse(cartRedisDto, "Đã xoá danh sách sản phẩm khỏi giỏ hàng", cartRequest.getCartId());
    }

}
