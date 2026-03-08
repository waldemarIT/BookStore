import { apiClient } from "./client";
import type { BookEvent } from "@/types";

export const eventsApi = {
  getAll: () =>
    apiClient.get<BookEvent[]>("/api/events").then((r) => r.data),

  getById: (id: number) =>
    apiClient.get<BookEvent>(`/api/events/${id}`).then((r) => r.data),

  register: (eventId: number) =>
    apiClient.post(`/api/events/${eventId}/register`).then((r) => r.data),
};
