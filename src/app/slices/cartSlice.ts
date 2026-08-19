import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: number;
  quantity: number;
  color: string;
  size: string;
}

interface cartState {
  items: CartItem[];
}

const initialState: cartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ productId: number; color: string; size: string }>,
    ) => {
      const { productId, color, size } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ productId, quantity: 1, size, color });
      }
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ productId: number; color: string; size: string }>,
    ) => {
      const { productId, color, size } = action.payload;
      const item = state.items.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size,
      );
      if (!item) return;
      item.quantity += 1;
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ productId: number; color: string; size: string }>,
    ) => {
      const { productId, color, size } = action.payload;
      const item = state.items.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size,
      );
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) =>
            !(
              item.productId === productId &&
              item.color === color &&
              item.size === size
            ),
        );
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: number; color: string; size: string }>,
    ) => {
      const { productId, color, size } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.color === color &&
            item.size === size
          ),
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
