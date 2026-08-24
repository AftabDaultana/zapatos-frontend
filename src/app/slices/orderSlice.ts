import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../../types/order";

interface OrderState {
  orders: Order[];
}

const getStoredOrders = (): Order[] => {
  const storedOrders = localStorage.getItem("orders");

  if (!storedOrders) return [];

  try {
    return JSON.parse(storedOrders);
  } catch (error) {
    console.error("Failed to parse orders: ", error);
    localStorage.removeItem("orders");
    return [];
  }
};

const initialState: OrderState = {
  orders: getStoredOrders(),
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{
        orderId: string;
        status: Order["status"];
      }>,
    ) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order) {
        order.status = status;
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },
  },
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
