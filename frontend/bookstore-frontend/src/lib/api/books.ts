import { apiClient } from "./client";
import type { Book, Page } from "@/types";

export interface BookFilters {
  genre?: string;
  authorId?: number;
  publisherId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  size?: number;
}

export const booksApi = {
  getAll: (filters: BookFilters = {}) =>
    apiClient.get<Page<Book>>("/api/books", { params: filters }).then((r) => r.data),

  getById: (id: number) =>
    apiClient.get<Book>(`/api/books/${id}`).then((r) => r.data),

  getFeatured: () =>
    apiClient.get<Book[]>("/api/books/featured").then((r) => r.data),

  getByGenre: (genre: string) =>
    apiClient.get<Book[]>(`/api/books/genre/${genre}`).then((r) => r.data),
};
