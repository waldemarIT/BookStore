package com.example.bookstore.books.service;

import com.example.bookstore.authors.entity.Author;
import com.example.bookstore.books.dto.BookRequest;
import com.example.bookstore.books.dto.BookResponse;
import com.example.bookstore.books.entity.Book;
import com.example.bookstore.books.mapper.BookMapper;
import com.example.bookstore.books.repository.BookRepository;
import com.example.bookstore.publishers.entity.Publisher;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // за замовчуванням всі методи — тільки читання
public class BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    // Отримати всі книги з фільтрами (пагінація)
    public Page<BookResponse> findAll(String genre, BigDecimal minPrice, BigDecimal maxPrice,
                                       String search, Pageable pageable) {
        return bookRepository
                .findWithFilters(genre, minPrice, maxPrice, search, pageable)
                .map(bookMapper::toResponse);
    }

    // Отримати книгу по ID
    public BookResponse findById(Long id) {
        return bookRepository.findById(id)
                .map(bookMapper::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + id));
    }

    // Отримати книгу по ISBN
    public BookResponse findByIsbn(String isbn) {
        return bookRepository.findByIsbn(isbn)
                .map(bookMapper::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with isbn: " + isbn));
    }

    // Книги конкретного автора
    public Page<BookResponse> findByAuthor(Long authorId, Pageable pageable) {
        return bookRepository.findByAuthorId(authorId, pageable)
                .map(bookMapper::toResponse);
    }

    // Створити книгу
    @Transactional
    public BookResponse create(BookRequest request) {
        if (bookRepository.existsByIsbn(request.getIsbn())) {
            throw new IllegalArgumentException("Book with ISBN " + request.getIsbn() + " already exists");
        }

        Book book = buildBookFromRequest(request, new Book());
        return bookMapper.toResponse(bookRepository.save(book));
    }

    // Оновити книгу
    @Transactional
    public BookResponse update(Long id, BookRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + id));

        buildBookFromRequest(request, book);
        return bookMapper.toResponse(bookRepository.save(book));
    }

    // Видалити книгу
    @Transactional
    public void delete(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new EntityNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }

    // Допоміжний метод — заповнює Book з Request
    private Book buildBookFromRequest(BookRequest request, Book book) {
        book.setIsbn(request.getIsbn());
        book.setTitle(request.getTitle());
        book.setGenre(request.getGenre());
        book.setPublicationYear(request.getPublicationYear());
        book.setPrice(request.getPrice());
        book.setStockQuantity(request.getStockQuantity());
        book.setDescription(request.getDescription());
        book.setCoverImageUrl(request.getCoverImageUrl());

        if (request.getPublisherId() != null) {
            Publisher publisher = new Publisher();
            publisher.setPublisherId(request.getPublisherId());
            book.setPublisher(publisher);
        }

        if (request.getAuthorIds() != null) {
            List<Author> authors = request.getAuthorIds().stream()
                    .map(authorId -> {
                        Author author = new Author();
                        author.setAuthorId(authorId);
                        return author;
                    })
                    .toList();
            book.setAuthors(authors);
        }

        return book;
    }
}
