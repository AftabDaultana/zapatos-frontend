import type { Address } from "./user";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

export interface Order {
  _id: string;
  userId: string | null;
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
