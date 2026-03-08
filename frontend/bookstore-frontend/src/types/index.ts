export interface Author {
  authorId: number;
  firstName: string;
  lastName: string;
  biography?: string;
  nationality?: string;
  birthDate?: string;
}

export interface Publisher {
  publisherId: number;
  name: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface Book {
  bookId: number;
  isbn: string;
  title: string;
  publisher?: Publisher;
  authors: Author[];
  genre?: string;
  publicationYear?: number;
  price: number;
  stockQuantity: number;
  description?: string;
  dateAdded?: string;
  coverImageUrl?: string;
}

export interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  registrationDate?: string;
}

export interface OrderItem {
  itemId: number;
  book: Book;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
}

export interface Order {
  orderId: number;
  customer: Customer;
  orderDate: string;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  deliveryType?: string;
  deliveryAddress?: string;
  completionDate?: string;
  items: OrderItem[];
}

export interface Payment {
  paymentId: number;
  orderId: number;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transactionNumber?: string;
}

export interface LoyaltyProgram {
  programId: number;
  customerId: number;
  currentPoints: number;
  totalPoints: number;
  joinDate: string;
  tierLevel: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  lastUpdated: string;
}

export interface BookEvent {
  eventId: number;
  name: string;
  description?: string;
  author?: Author;
  eventDate: string;
  location?: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
}

export interface AuthResponse {
  token: string;
  customer: Customer;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
}
