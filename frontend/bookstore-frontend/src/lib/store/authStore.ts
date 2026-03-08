import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Customer } from "@/types";

interface AuthStore {
  token: string | null;
  customer: Customer | null;
  isAuthenticated: boolean;
  login: (token: string, customer: Customer) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      customer: null,
      isAuthenticated: false,

      login: (token, customer) => {
        localStorage.setItem("token", token);
        set({ token, customer, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ token: null, customer: null, isAuthenticated: false });
      },
    }),
    { name: "bookstore-auth" }
  )
);
