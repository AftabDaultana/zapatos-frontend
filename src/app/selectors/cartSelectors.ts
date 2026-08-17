import type { RootState } from "../store";

export const selectCartItem = (state: RootState) => state.cart.items;
export const selectCartItemCount = (state: RootState) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const selectCartProducts = (state: RootState) => {
  return state.cart.items.map((cartItem) => {
    const product = state.catalog.products.find(
      (product) => product.id === cartItem.productId,
    );
    return {
      product,
      quantity: cartItem.quantity,
    };
  });
};

export const selectCartSubTotal = (state: RootState) => {
  return state.cart.items.reduce((total, cartItem) => {
    const product = state.catalog.products.find(
      (product) => product.id === cartItem.productId,
    );
    if (!product) return total;
    return total + product.discountedPrice * cartItem.quantity;
  }, 0);
};
