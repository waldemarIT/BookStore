import { apiClient } from "./client";

export interface OrderItem {
  itemId: number;
  bookId: number;
  bookTitle: string;
  coverImageUrl?: string;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
}

export interface Order {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  deliveryType?: string;
  deliveryAddress?: string;
  items: OrderItem[];
}

export interface CreateOrderPayload {
  items: { bookId: number; quantity: number }[];
  deliveryType?: string;
  deliveryAddress?: string;
}

export const ordersApi = {
  myOrders: () => apiClient.get<Order[]>("/api/orders").then((r) => r.data),
  create: (payload: CreateOrderPayload) =>
    apiClient.post<Order>("/api/orders", payload).then((r) => r.data),
};
