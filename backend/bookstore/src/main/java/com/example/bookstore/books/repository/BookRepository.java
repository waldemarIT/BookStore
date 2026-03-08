package com.example.bookstore.books.repository;

import com.example.bookstore.books.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findByIsbn(String isbn);

    Page<Book> findByGenre(String genre, Pageable pageable);

    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Book> findByPriceBetween(BigDecimal min, BigDecimal max, Pageable pageable);

    // Пошук книг конкретного автора
    @Query("SELECT b FROM Book b JOIN b.authors a WHERE a.authorId = :authorId")
    Page<Book> findByAuthorId(@Param("authorId") Long authorId, Pageable pageable);

    // Пошук за кількома фільтрами одночасно
    @Query("""
            SELECT b FROM Book b
            WHERE (:genre IS NULL OR b.genre = :genre)
              AND (:minPrice IS NULL OR b.price >= :minPrice)
              AND (:maxPrice IS NULL OR b.price <= :maxPrice)
              AND (:search IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')))
            """)
    Page<Book> findWithFilters(
            @Param("genre") String genre,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("search") String search,
            Pageable pageable
    );

    boolean existsByIsbn(String isbn);
}
