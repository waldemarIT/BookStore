package com.example.bookstore.books.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

// DTO для відправки даних клієнту (GET)
// Ніколи не повертаємо Entity напряму — тільки DTO
@Data
public class BookResponse {

    private Long bookId;
    private String isbn;
    private String title;
    private String genre;
    private Integer publicationYear;
    private BigDecimal price;
    private Integer stockQuantity;
    private String description;
    private String coverImageUrl;
    private LocalDateTime dateAdded;

    // Вкладені DTO — не самі Entity об'єкти
    private PublisherInfo publisher;
    private List<AuthorInfo> authors;

    @Data
    public static class PublisherInfo {
        private Long publisherId;
        private String name;
        private String website;
    }

    @Data
    public static class AuthorInfo {
        private Long authorId;
        private String firstName;
        private String lastName;
        private String nationality;
    }
}
