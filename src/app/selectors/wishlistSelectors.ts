import type { RootState } from "../store";

export const selectWishlistItems = (state: RootState) => {
  return state.wishlist.items;
};

export const selectWishlistProductIds = (state: RootState) => {
  return state.wishlist.items.map((item) => item.productId);
};
