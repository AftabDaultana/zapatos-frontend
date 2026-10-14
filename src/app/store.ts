import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import catalogReducer from "./slices/catalogSlice";
import catalogFiltersReducer from "./slices/catalogFiltersSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import wishlistReducer from "./slices/wishlistSlice";
import analyticsReducer from "./slices/analyticsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    catalog: catalogReducer,
    catalogFilters: catalogFiltersReducer,
    cart: cartReducer,
    order: orderReducer,
    wishlist: wishlistReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
