import type { RootState } from "../store";

export const selectWishlistItems = (state: RootState) => {
  return state.wishlist.items;
};

export const selectWishlistProductIds = (state: RootState) => {
  return state.wishlist.items.map((item) => item.productId);
};

export const selectWishlistProducts = (state: RootState) => {
  const wishlistProductsIds = state.wishlist.items.map(
    (item) => item.productId,
  );

  return state.catalog.products.filter((product) =>
    wishlistProductsIds.includes(product.id),
  );
};
