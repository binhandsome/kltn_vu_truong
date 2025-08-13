package com.kltnbe.cartservice.controllers;

import com.kltnbe.cartservice.dtos.CartItemDto;
import com.kltnbe.cartservice.dtos.req.CartRequest;
import com.kltnbe.cartservice.dtos.req.RemoveSelectedItemsRequest;
import com.kltnbe.cartservice.dtos.res.CartResponse;
import com.kltnbe.cartservice.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/addCart")
    public CartResponse addItemToCart(@RequestBody CartRequest cartRequest) {
        System.out.println("Gọi endpoint /addCart với request: " + cartRequest);
        CartResponse cartResponse = cartService.addItemToCart(cartRequest);
        System.out.println("Trả về response: " + cartResponse);
        return cartResponse;
    }

    @GetMapping("/getCart")
    public CartResponse getItemCart(@RequestParam(required = false) String token,
                                    @RequestParam(required = false) String cartId) {
        CartRequest cartRequest = new CartRequest();
        cartRequest.setToken(token);
        cartRequest.setCartId(cartId);

        System.out.println("Gọi endpoint /getCart với request: " + cartRequest);
        CartResponse cartResponse = cartService.getItemCart(cartRequest);
        System.out.println("Trả về response: " + cartResponse);
        return cartResponse;
    }

    @GetMapping("/getCartByID")
    public CartResponse getItemCartByID(@RequestParam String cartID, @RequestParam List<String> asin) {
        System.out.println("Gọi endpoint /getCart với request: " + cartID);
        CartResponse cartResponse = cartService.getCartByID(cartID, asin);
        System.out.print(cartID + "cartid cua toi la") ;
        System.out.println("Trả về response: " + cartResponse);
        return cartResponse;
    }


    @PostMapping("/removeItem")
    public CartResponse removeItemFromCart(@RequestBody CartRequest cartRequest) {
        System.out.println("Gọi endpoint /removeItem với request: " + cartRequest);
        CartResponse cartResponse = cartService.removeItemFromCart(cartRequest);
        System.out.println("Trả về response: " + cartResponse);
        return cartResponse;
    }

    @PutMapping("/updateItem")
    public CartResponse updateItemQuantity(@RequestBody CartRequest cartRequest) {
        System.out.println("Gọi endpoint /updateItem với request: " + cartRequest);
        CartResponse cartResponse = cartService.updateItemQuantity(cartRequest);
        System.out.println("Trả về response: " + cartResponse);
        return cartResponse;
    }

    @DeleteMapping("/clearCart")
    public CartResponse clearCart(@RequestBody CartRequest cartRequest) {
        System.out.println("Gọi endpoint /clearCart với request: " + cartRequest);
        CartResponse cartResponse = cartService.clearCart(cartRequest);
        System.out.println("Trả về response: " + cartResponse);
        return cartResponse;
    }
    @PostMapping("/removeSelectedItems")
    public CartResponse removeSelectedItemsFromCart(@RequestBody RemoveSelectedItemsRequest request) {
        System.out.println("Gọi endpoint /removeSelectedItems với request: " + request);

        CartRequest cartRequest = new CartRequest();
        cartRequest.setToken(request.getToken());
        cartRequest.setCartId(request.getCartId());

        CartResponse cartResponse = cartService.removeMultipleItemsFromCart(cartRequest, request.getAsinList());

        System.out.println("Trả về response: " + cartResponse);
        return cartResponse;
    }
    @PostMapping("/removePurchased")
    public ResponseEntity<CartResponse> removePurchased(
            @RequestParam(required = false) String token,
            @RequestParam(required = false) String cartId,
            @RequestBody List<CartItemDto> items
    ) {
        CartRequest base = new CartRequest();
        base.setToken(token);
        base.setCartId(cartId);
        CartResponse res = cartService.removePurchasedItems(base, items);
        return ResponseEntity.ok(res);
    }


}
