package com.example.bookstore.orders.controller;

import com.example.bookstore.auth.entity.User;
import com.example.bookstore.orders.dto.CreateOrderRequest;
import com.example.bookstore.orders.dto.OrderResponse;
import com.example.bookstore.orders.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<OrderResponse> myOrders(@AuthenticationPrincipal User user) {
        return orderService.getMyOrders(user.getId());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse create(@AuthenticationPrincipal User user,
                                @Valid @RequestBody CreateOrderRequest req) {
        return orderService.createOrder(user.getId(), req);
    }
}
