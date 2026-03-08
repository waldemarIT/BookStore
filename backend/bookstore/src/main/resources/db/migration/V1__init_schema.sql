-- =============================================
-- BookStore Pro — Initial Schema
-- =============================================

CREATE TABLE IF NOT EXISTS publishers (
    publisher_id BIGSERIAL PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    address      VARCHAR(500),
    email        VARCHAR(255),
    phone        VARCHAR(50),
    website      VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS authors (
    author_id   BIGSERIAL PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    biography   TEXT,
    nationality VARCHAR(100),
    birth_date  DATE
);

CREATE TABLE IF NOT EXISTS books (
    book_id           BIGSERIAL PRIMARY KEY,
    isbn              VARCHAR(20) UNIQUE NOT NULL,
    title             VARCHAR(500) NOT NULL,
    publisher_id      BIGINT REFERENCES publishers(publisher_id),
    genre             VARCHAR(100),
    publication_year  INT,
    price             NUMERIC(10, 2) NOT NULL,
    stock_quantity    INT NOT NULL DEFAULT 0,
    description       TEXT,
    date_added        TIMESTAMP DEFAULT NOW(),
    cover_image_url   VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS books_authors (
    id         BIGSERIAL PRIMARY KEY,
    book_id    BIGINT NOT NULL REFERENCES books(book_id) ON DELETE CASCADE,
    author_id  BIGINT NOT NULL REFERENCES authors(author_id) ON DELETE CASCADE,
    role       VARCHAR(100) DEFAULT 'AUTHOR'
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id         BIGSERIAL PRIMARY KEY,
    first_name          VARCHAR(100) NOT NULL,
    last_name           VARCHAR(100) NOT NULL,
    email               VARCHAR(255) UNIQUE NOT NULL,
    password_hash       VARCHAR(255) NOT NULL,
    phone               VARCHAR(50),
    address             VARCHAR(500),
    city                VARCHAR(100),
    postal_code         VARCHAR(20),
    registration_date   TIMESTAMP DEFAULT NOW(),
    marketing_consent   BOOLEAN DEFAULT FALSE,
    role                VARCHAR(50) DEFAULT 'CUSTOMER'
);

CREATE TABLE IF NOT EXISTS loyalty_program (
    program_id      BIGSERIAL PRIMARY KEY,
    customer_id     BIGINT UNIQUE NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    current_points  INT NOT NULL DEFAULT 0,
    total_points    INT NOT NULL DEFAULT 0,
    join_date       TIMESTAMP DEFAULT NOW(),
    tier_level      VARCHAR(50) DEFAULT 'BRONZE',
    last_updated    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    order_id          BIGSERIAL PRIMARY KEY,
    customer_id       BIGINT NOT NULL REFERENCES customers(customer_id),
    order_date        TIMESTAMP DEFAULT NOW(),
    total_amount      NUMERIC(10, 2) NOT NULL,
    status            VARCHAR(50) DEFAULT 'PENDING',
    delivery_type     VARCHAR(50),
    delivery_address  VARCHAR(500),
    completion_date   TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    item_id     BIGSERIAL PRIMARY KEY,
    order_id    BIGINT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    book_id     BIGINT NOT NULL REFERENCES books(book_id),
    quantity    INT NOT NULL,
    unit_price  NUMERIC(10, 2) NOT NULL,
    item_total  NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id          BIGSERIAL PRIMARY KEY,
    order_id            BIGINT NOT NULL REFERENCES orders(order_id),
    payment_date        TIMESTAMP DEFAULT NOW(),
    amount              NUMERIC(10, 2) NOT NULL,
    payment_method      VARCHAR(50),
    payment_status      VARCHAR(50) DEFAULT 'PENDING',
    transaction_number  VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS events (
    event_id              BIGSERIAL PRIMARY KEY,
    name                  VARCHAR(255) NOT NULL,
    description           TEXT,
    author_id             BIGINT REFERENCES authors(author_id),
    event_date            TIMESTAMP NOT NULL,
    location              VARCHAR(500),
    max_participants      INT,
    current_participants  INT DEFAULT 0,
    status                VARCHAR(50) DEFAULT 'UPCOMING'
);

-- Indexes
CREATE INDEX idx_books_genre ON books(genre);
CREATE INDEX idx_books_publisher ON books(publisher_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_events_date ON events(event_date);
