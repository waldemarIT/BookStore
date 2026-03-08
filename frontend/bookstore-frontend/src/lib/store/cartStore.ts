import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Book } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (book, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.book.bookId === book.bookId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.book.bookId === book.bookId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { book, quantity }] };
        });
      },

      removeItem: (bookId) =>
        set((state) => ({
          items: state.items.filter((i) => i.book.bookId !== bookId),
        })),

      updateQuantity: (bookId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.book.bookId !== bookId)
              : state.items.map((i) =>
                  i.book.bookId === bookId ? { ...i, quantity } : i
                ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.book.price * i.quantity, 0),
    }),
    { name: "bookstore-cart" }
  )
);
