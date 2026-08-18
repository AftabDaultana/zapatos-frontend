import type { RootState } from "../store";

export const selectOrder = (state: RootState) => {
  return state.order.orders;
};

export const selectOrderById = (state: RootState, orderId: string) => {
  return state.order.orders.find((order) => order.id === orderId);
};

export const selectOrdersByUserId = (state: RootState, userId: number) => {
  return state.order.orders.filter((order) => order.userId === userId);
};
