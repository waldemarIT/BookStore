# Що читати для BookStore проекту

## Книга "Spring Start Here" (Laurentiu Spilca)

| Chapter | Тема | Що дає для проекту |
|---|---|---|
| Ch 1–6 | Part 1 | ✅ Вже пройшов — Spring Context, Beans, AOP |
| **Ch 10** | REST services | `@RestController`, `@RequestBody` — зрозумієш Controller |
| **Ch 13** | Transactions | Як працює `@Transactional` в Service |
| **Ch 14** | Spring Data | Entity, Repository, запити до БД — **читати першим** |
| Ch 7–8 | Spring Boot + MVC | Корисний контекст перед Ch 10 |
| Ch 12 | Data sources | Контекст перед Ch 14 |
| Ch 6, 9, 11, 15 | AOP, Scopes, Feign, Tests | Можна пропустити або пізніше |

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
