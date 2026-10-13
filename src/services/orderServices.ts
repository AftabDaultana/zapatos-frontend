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

export interface GetAllOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: Order["status"];
}

export interface PaginatedOrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    totalOrders: number;
    totalPages: number;
  };
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

export const updateOrderStatus = async (
  id: string,
  status: Order["status"],
): Promise<Order> => {
  const response = await api.put(`/orders/admin/${id}`, { status });

  return response.data.data;
};

export const getAllOrders = async (
  params: GetAllOrdersParams = {},
): Promise<PaginatedOrdersResponse> => {
  const response = await api.get("/orders/admin", {
    params,
  });

  return response.data.data;
};

export const cancelOrder = async (orderId: string) => {
  const response = await api.patch(`/orders/${orderId}`);
  return response.data;
};
