import api from "../api/axios";
import type { Order } from "../types/order";

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CreateOrderItem {
  productId: string;
  quantity: number;
  color: string;
  size: string;
}

export interface CreateOrderData {
  customer: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  billingAddress: OrderAddress;
  shippingAddress: OrderAddress;
  items: CreateOrderItem[];
}

export const createOrder = async (data: CreateOrderData) => {
  const response = await api.post("/orders", data);

  return response.data;
};

export const getCurrentUserOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders/user");

  return response.data.data.orders;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await api.get(`/orders/${id}`);

  return response.data.data;
};
