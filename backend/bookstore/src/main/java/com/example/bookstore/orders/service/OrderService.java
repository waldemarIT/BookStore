package com.example.bookstore.orders.service;

import com.example.bookstore.books.entity.Book;
import com.example.bookstore.books.repository.BookRepository;
import com.example.bookstore.loyalty.entity.LoyaltyProgram;
import com.example.bookstore.loyalty.repository.LoyaltyRepository;
import com.example.bookstore.orders.dto.CreateOrderRequest;
import com.example.bookstore.orders.dto.OrderResponse;
import com.example.bookstore.orders.entity.Order;
import com.example.bookstore.orders.entity.OrderItem;
import com.example.bookstore.orders.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;
    private final LoyaltyRepository loyaltyRepository;

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(Long customerId) {
        return orderRepository.findByCustomerIdOrderByOrderDateDesc(customerId)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public OrderResponse createOrder(Long customerId, CreateOrderRequest req) {
        Order order = Order.builder()
                .customerId(customerId)
                .deliveryType(req.getDeliveryType())
                .deliveryAddress(req.getDeliveryAddress())
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal total = BigDecimal.ZERO;

        for (CreateOrderRequest.OrderItemRequest itemReq : req.getItems()) {
            Book book = bookRepository.findById(itemReq.getBookId())
                    .orElseThrow(() -> new EntityNotFoundException("Book not found: " + itemReq.getBookId()));

            BigDecimal itemTotal = book.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            total = total.add(itemTotal);

            OrderItem item = OrderItem.builder()
                    .order(order)
                    .book(book)
                    .quantity(itemReq.getQuantity())
                    .unitPrice(book.getPrice())
                    .itemTotal(itemTotal)
                    .build();
            order.getItems().add(item);
        }

        order.setTotalAmount(total);
        Order saved = orderRepository.save(order);

        // Award loyalty points: 1 point per $1 spent
        int points = total.intValue();
        loyaltyRepository.findByCustomerId(customerId).ifPresentOrElse(
                loyalty -> {
                    loyalty.setCurrentPoints(loyalty.getCurrentPoints() + points);
                    loyalty.setTotalPoints(loyalty.getTotalPoints() + points);
                    updateTier(loyalty);
                    loyaltyRepository.save(loyalty);
                },
                () -> {
                    LoyaltyProgram lp = LoyaltyProgram.builder()
                            .customerId(customerId)
                            .currentPoints(points)
                            .totalPoints(points)
                            .build();
                    updateTier(lp);
                    loyaltyRepository.save(lp);
                }
        );

        return toResponse(saved);
    }

    private void updateTier(LoyaltyProgram lp) {
        int total = lp.getTotalPoints();
        if (total >= 5000)      lp.setTierLevel("PLATINUM");
        else if (total >= 1500) lp.setTierLevel("GOLD");
        else if (total >= 500)  lp.setTierLevel("SILVER");
        else                    lp.setTierLevel("BRONZE");
    }

    private OrderResponse toResponse(Order order) {
        List<OrderResponse.ItemDto> items = order.getItems().stream()
                .map(i -> OrderResponse.ItemDto.builder()
                        .itemId(i.getItemId())
                        .bookId(i.getBook().getBookId())
                        .bookTitle(i.getBook().getTitle())
                        .coverImageUrl(i.getBook().getCoverImageUrl())
                        .quantity(i.getQuantity())
                        .unitPrice(i.getUnitPrice())
                        .itemTotal(i.getItemTotal())
                        .build())
                .toList();

        return OrderResponse.builder()
                .orderId(order.getOrderId())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .deliveryType(order.getDeliveryType())
                .deliveryAddress(order.getDeliveryAddress())
                .items(items)
                .build();
    }
}
