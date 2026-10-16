import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Wishlist, WishlistItem } from "../../types/wishlist";
import {
  getWishlist,
  toggleWishlistItem,
} from "../../services/wihslistServices";

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk<
  Wishlist,
  void,
  { rejectValue: string }
>("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
  try {
    return await getWishlist();
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ?? "Failed to fetch wishlist.",
    );
  }
});

export const toggleWishlist = createAsyncThunk<
  Wishlist,
  string,
  { rejectValue: string }
>("wishlist/toggleWishlist", async (productId, { rejectWithValue }) => {
  try {
    await toggleWishlistItem(productId);
    return await getWishlist();
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ?? "Failed to update wishlist.",
    );
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch wishlist.";
      })
      .addCase(toggleWishlist.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update wishlist.";
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
