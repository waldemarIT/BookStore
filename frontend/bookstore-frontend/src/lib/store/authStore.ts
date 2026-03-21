import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  registrationDate?: string;
  role: string;
}

interface AuthStore {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  setUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: (token, user) => {
        // Also store in cookie for middleware
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
        set({ token, user, isAuthenticated: true });
      },

      logout: () => {
        document.cookie = "token=; path=/; max-age=0";
        set({ token: null, user: null, isAuthenticated: false });
      },

      setUser: (user) => set({ user }),
    }),
    { name: "bookstore-auth" }
  )
);
