import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WishlistItem } from "../../types/wishlist";

export interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const exist = state.items.some((item) => item.productId === productId);

      if (!exist) state.items.push({ productId });
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
