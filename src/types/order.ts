import type { Address } from "./user";

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: number | null;
  customer: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  billingAddress: Address;
  shippingAddress: Address;

  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;

  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}
