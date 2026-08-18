import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import catalogReducer from "./slices/catalogSlice";
import catalogFiltersReducer from "./slices/catalogFiltersSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    catalog: catalogReducer,
    catalogFilters: catalogFiltersReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
