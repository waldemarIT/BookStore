package com.example.bookstore.orders.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private Long orderId;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String status;
    private String deliveryType;
    private String deliveryAddress;
    private List<ItemDto> items;

    @Data
    @Builder
    public static class ItemDto {
        private Long itemId;
        private Long bookId;
        private String bookTitle;
        private String coverImageUrl;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal itemTotal;
    }
}
