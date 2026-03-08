package com.example.bookstore.books.controller;

import com.example.bookstore.books.dto.BookRequest;
import com.example.bookstore.books.dto.BookResponse;
import com.example.bookstore.books.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Tag(name = "Books", description = "Books catalog API")
public class BookController {

    private final BookService bookService;

    // GET /api/books?genre=Fiction&minPrice=10&maxPrice=50&search=harry&page=0&size=20
    @GetMapping
    @Operation(summary = "Get all books with optional filters")
    public Page<BookResponse> getAll(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String search,
            @PageableDefault(size = 20, sort = "dateAdded") Pageable pageable
    ) {
        return bookService.findAll(genre, minPrice, maxPrice, search, pageable);
    }

    // GET /api/books/123
    @GetMapping("/{id}")
    @Operation(summary = "Get book by ID")
    public BookResponse getById(@PathVariable Long id) {
        return bookService.findById(id);
    }

    // GET /api/books/isbn/978-3-16-148410-0
    @GetMapping("/isbn/{isbn}")
    @Operation(summary = "Get book by ISBN")
    public BookResponse getByIsbn(@PathVariable String isbn) {
        return bookService.findByIsbn(isbn);
    }

    // GET /api/books/author/5
    @GetMapping("/author/{authorId}")
    @Operation(summary = "Get books by author")
    public Page<BookResponse> getByAuthor(
            @PathVariable Long authorId,
            @PageableDefault(size = 20) Pageable pageable
    ) {
        return bookService.findByAuthor(authorId, pageable);
    }

    // POST /api/books
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new book")
    public BookResponse create(@Valid @RequestBody BookRequest request) {
        return bookService.create(request);
    }

    // PUT /api/books/123
    @PutMapping("/{id}")
    @Operation(summary = "Update a book")
    public BookResponse update(@PathVariable Long id, @Valid @RequestBody BookRequest request) {
        return bookService.update(id, request);
    }

    // DELETE /api/books/123
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a book")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
