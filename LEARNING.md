# Що читати для BookStore проекту

## Книга "Spring Start Here" (Laurentiu Spilca)

| Частина | Розділи | Що дає для проекту |
|---|---|---|
| Part 1 | 1–5 | ✅ Вже пройшов — Spring Context, Beans |
| Part 3 | 13–15 | Spring Data JPA, репозиторії, запити — **читати першим** |
| Part 4 | 10–12 | Spring MVC, REST, `@RestController` — зрозумієш Controller |
| Part 2 | 6–7 | `@Transactional`, AOP — можна після Part 3 |

---

## Окремо (Baeldung — просто гуглити)

### JPA / Hibernate — найважливіше
Книга не пояснює зв'язки між таблицями достатньо глибоко.

- `baeldung JPA @ManyToMany`
- `baeldung JPA @OneToMany`
- `baeldung FetchType LAZY vs EAGER`
- `baeldung JPA @JoinColumn`

### Інше
- `baeldung spring validation` — як працює `@NotBlank`, `@Valid`
- `why use DTO instead of entity spring` — чому не повертати Entity напряму

---

## Lombok (15 хвилин) — projectlombok.org

Не Spring — окрема бібліотека що генерує код. Потрібно знати 5 анотацій:

```java
@Getter / @Setter    // генерує getters і setters
@NoArgsConstructor   // конструктор без параметрів
@AllArgsConstructor  // конструктор з усіма параметрами
@Builder             // патерн Builder: Book.builder().title("...").build()
@Data                // = @Getter + @Setter + @ToString + @EqualsAndHashCode
```

---

## Порядок

```
Part 3 книги (JPA)
      ↓
Baeldung: JPA relationships (2-3 статті)
      ↓
Part 4 книги (MVC / REST)
      ↓
Lombok (15 хв)
      ↓
Part 2 книги (Transactional, AOP)
      ↓
Пишеш модулі самостійно 🚀
```

---

## Як працює запит (flow)

```
HTTP Request (наприклад GET /api/books/5)
       ↓
BookController      ← отримує запит, викликає сервіс
       ↓
BookService         ← бізнес-логіка, валідація, транзакції
       ↓
BookRepository      ← запит до БД
       ↓
Book (Entity)       ← результат з БД
       ↓
BookMapper          ← конвертує Entity → Response
       ↓
BookResponse        ← відправляється клієнту (JSON)
```

**Правило:** кожен шар знає тільки про наступний.
Controller не знає про БД. Repository не знає про HTTP.

---

## Модулі для самостійного написання

Патерн той самий що в `books/` — entity, repository, dto, mapper, service, controller.

| Модуль | Складність | Особливість |
|---|---|---|
| `publishers/` | ⭐ Легкий | Без складних зв'язків |
| `authors/` | ⭐ Легкий | Без складних зв'язків |
| `customers/` | ⭐⭐ Середній | Схожий на books |
| `events/` | ⭐⭐ Середній | `@ManyToOne` з Author |
| `loyalty/` | ⭐⭐ Середній | `@OneToOne` з Customer |
| `payments/` | ⭐⭐ Середній | `@OneToOne` з Order |
| `orders/` + `order_items/` | ⭐⭐⭐ Складніший | `@OneToMany` між Order і OrderItem |
