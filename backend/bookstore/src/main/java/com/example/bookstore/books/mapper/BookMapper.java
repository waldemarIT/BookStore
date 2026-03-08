package com.example.bookstore.books.mapper;

import com.example.bookstore.books.dto.BookResponse;
import com.example.bookstore.books.entity.Book;
import com.example.bookstore.authors.entity.Author;
import com.example.bookstore.publishers.entity.Publisher;
import org.mapstruct.*;

// MapStruct генерує реалізацію цього інтерфейсу автоматично під час компіляції
@Mapper(componentModel = "spring")
public interface BookMapper {

    @Mapping(target = "publisher", source = "publisher", qualifiedByName = "toPublisherInfo")
    @Mapping(target = "authors", source = "authors")
    BookResponse toResponse(Book book);

    @Named("toPublisherInfo")
    static BookResponse.PublisherInfo toPublisherInfo(Publisher publisher) {
        if (publisher == null) return null;
        BookResponse.PublisherInfo info = new BookResponse.PublisherInfo();
        info.setPublisherId(publisher.getPublisherId());
        info.setName(publisher.getName());
        info.setWebsite(publisher.getWebsite());
        return info;
    }

    static BookResponse.AuthorInfo toAuthorInfo(Author author) {
        if (author == null) return null;
        BookResponse.AuthorInfo info = new BookResponse.AuthorInfo();
        info.setAuthorId(author.getAuthorId());
        info.setFirstName(author.getFirstName());
        info.setLastName(author.getLastName());
        info.setNationality(author.getNationality());
        return info;
    }
}
