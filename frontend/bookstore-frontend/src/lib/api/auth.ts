import { apiClient } from "./client";
import type { AuthResponse } from "@/types";

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
    apiClient.get<AuthResponse["customer"]>("/api/auth/me").then((r) => r.data),
};
