import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type CartItem,
  type AddToCartData,
  getUserCart,
  addToCart,
  updateCart,
  deleteCartItem,
  clearCart,
  type PaginatedCartsResponse,
  getAllCarts,
  type Cart,
} from "../../services/cartServices";

interface Cartstate {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  adminCarts: Cart[];
  pagination: {
    page: number;
    limit: number;
    totalCarts: number;
    totalPages: number;
  } | null;
}

const GUEST_CART_KEY = "guestCart";

const getGuestCart = (): CartItem[] => {
  const storedCart = localStorage.getItem(GUEST_CART_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    return JSON.parse(storedCart);
  } catch {
    return [];
  }
};

const saveGuestCart = (items: CartItem[]) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
};

const clearGuestCart = () => {
  localStorage.removeItem(GUEST_CART_KEY);
};

const initialState: Cartstate = {
  items: getGuestCart(),
  loading: false,
  error: null,
  adminCarts: [],
  pagination: null,
};

export const fetchCart = createAsyncThunk(
  "/cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserCart();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch",
      );
    }
  },
);

export const fetchAllCarts = createAsyncThunk<
  PaginatedCartsResponse,
  { page: number; limit: number },
  { rejectValue: string }
>("cart/fetchAllCarts", async ({ page, limit }, { rejectWithValue }) => {
  try {
    return await getAllCarts(page, limit);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch carts.",
    );
  }
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (data: AddToCartData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as {
        user: {
          currentUser: unknown;
        };
        cart: Cartstate;
      };

      if (!state.user.currentUser) {
        const existingItemIndex = state.cart.items.findIndex(
          (item) =>
            item.productId._id === data.productId &&
            item.size === data.size &&
            item.color === data.color,
        );

        let updatedItems: CartItem[];

        if (existingItemIndex !== -1) {
          updatedItems = state.cart.items.map((item, index) =>
            index === existingItemIndex
              ? {
                  ...item,
                  quantity: item.quantity + data.quantity,
                }
              : item,
          );
        } else {
          updatedItems = [
            ...state.cart.items,
            {
              productId: data.product,
              quantity: data.quantity,
              color: data.color,
              size: data.size,
            },
          ];
        }

        saveGuestCart(updatedItems);

        return {
          items: updatedItems,
        };
      }

      const { product, ...cartData } = data;

      const response = await addToCart(cartData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart",
      );
    }
  },
);

export const mergeGuestCart = createAsyncThunk(
  "cart/mergeGuestCart",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const guestItems = getGuestCart();

      for (const item of guestItems) {
        await dispatch(
          addItemToCart({
            product: item.productId,
            productId: item.productId._id!,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          }),
        ).unwrap();
      }

      if (guestItems.length > 0) {
        clearGuestCart();
      }

      return await dispatch(fetchCart()).unwrap();
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to load cart.");
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    data: { productId: string; quantity: number },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as {
        user: {
          currentUser: unknown;
        };
        cart: Cartstate;
      };

      if (!state.user.currentUser) {
        const updatedItems = state.cart.items.map((item) =>
          item.productId._id === data.productId
            ? {
                ...item,
                quantity: data.quantity,
              }
            : item,
        );

        saveGuestCart(updatedItems);

        return {
          items: updatedItems,
        };
      }

      const response = await updateCart(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart.",
      );
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as {
        user: {
          currentUser: unknown;
        };
        cart: Cartstate;
      };

      if (!state.user.currentUser) {
        const updatedItems = state.cart.items.filter(
          (item) => item.productId._id !== productId,
        );

        saveGuestCart(updatedItems);

        return {
          items: updatedItems,
        };
      }

      const response = await deleteCartItem(productId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove cart item.",
      );
    }
  },
);

export const clearUserCart = createAsyncThunk(
  "cart/clearUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCart();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart.",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        ((state.loading = false), (state.items = action.payload.items));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.adminCarts = action.payload.carts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch carts.";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })

      .addCase(clearUserCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
