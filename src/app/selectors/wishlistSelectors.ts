import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Product } from "../../services/productServices";

const selectWishlistItems = (state: RootState) => state.wishlist.items;

export const selectWishlistProductIds = createSelector(
  [selectWishlistItems],
  (items): string[] =>
    items.map((item) =>
      typeof item.productId === "string" ? item.productId : item.productId._id,
    ),
);

export const selectWishlistProducts = createSelector(
  [selectWishlistItems],
  (items): Product[] =>
    items.flatMap((item) =>
      typeof item.productId === "string" ? [] : [item.productId as Product],
    ),
);
