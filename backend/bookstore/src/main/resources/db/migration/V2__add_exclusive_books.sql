-- Add is_exclusive flag to books
ALTER TABLE books ADD COLUMN IF NOT EXISTS is_exclusive BOOLEAN NOT NULL DEFAULT FALSE;

-- Index for filtering exclusive books
CREATE INDEX IF NOT EXISTS idx_books_exclusive ON books(is_exclusive);
