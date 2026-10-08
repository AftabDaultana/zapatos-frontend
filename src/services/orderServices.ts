import api from "../api/axios";

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
