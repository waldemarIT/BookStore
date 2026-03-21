import { apiClient } from "./client";
import type { AuthUser } from "@/lib/store/authStore";

export interface AuthResponse {
  token: string;
  customer: AuthUser;
}

export interface LoyaltyDto {
  currentPoints: number;
  totalPoints: number;
  tierLevel: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
}

export interface ProfileResponse {
  customer: AuthUser;
  loyalty: LoyaltyDto | null;
}

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>("/api/auth/login", { email, password }).then((r) => r.data),

  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    marketingConsent?: boolean;
  }) =>
    apiClient.post<AuthResponse>("/api/auth/register", data).then((r) => r.data),

  me: () =>
    apiClient.get<ProfileResponse>("/api/users/me").then((r) => r.data),
};
