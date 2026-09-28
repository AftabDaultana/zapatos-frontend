import type { RootState } from "../store";

export const selectCartItem = (state: RootState) => state.cart.items;
export const selectCartItemCount = (state: RootState) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const selectCartProducts = (state: RootState) =>
  state.cart.items.map((cartItem) => ({
    product: cartItem.productId,
    quantity: cartItem.quantity,
    color: cartItem.color,
    size: cartItem.size,
  }));

export const selectCartSubTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, cartItem) =>
      total + cartItem.productId.discountedPrice * cartItem.quantity,
    0,
  );
