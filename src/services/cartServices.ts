import api from "../api/axios";
import type { Product } from "./productServices";

export interface CartItem {
  productId: Product;
  quantity: number;
  color: string;
  size: string;
}

export interface Cart {
  _id: string;
  userId: {
    _id: string;
    name: string;
    phoneNumber: string;
  };
  items: CartItem[];
}

export interface PaginatedCartsResponse {
  carts: Cart[];
  pagination: {
    page: number;
    limit: number;
    totalCarts: number;
    totalPages: number;
  };
}

export interface AddToCartData {
  product: Product;
  productId: string;
  quantity: number;
  color: string;
  size: string;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  color: string;
  size: string;
}

export interface UpdateCartData {
  productId: string;
  quantity?: number;
}

export const addToCart = async (data: AddToCartPayload) => {
  const response = await api.post("/cart", data);

  return response.data;
};

export const getAllCarts = async (
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedCartsResponse> => {
  const response = await api.get("/cart/admin", {
    params: { page, limit },
  });

  return response.data.data;
};

export const getUserCart = async (): Promise<Cart> => {
  const response = await api.get("/cart/user");

  return response.data.data;
};

export const updateCart = async (data: UpdateCartData) => {
  const response = await api.put("/cart", data);

  return response.data;
};

export const deleteCartItem = async (productId: string) => {
  const response = await api.delete("/cart", {
    data: { productId },
  });

  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart/clear");

  return response.data;
};
