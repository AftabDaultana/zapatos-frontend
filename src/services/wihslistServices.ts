import api from "../api/axios";
import type { Wishlist } from "../types/wishlist";

export const toggleWishlistItem = async (productId: string) => {
  const response = await api.put("/wishlist", { productId });

  return response.data.data as {
    action: "added" | "removed";
    wishlist: Wishlist;
  };
};

export const getWishlist = async () => {
  const response = await api.get("/wishlist");

  return response.data.data as Wishlist;
};
