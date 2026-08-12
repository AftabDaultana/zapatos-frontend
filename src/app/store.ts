import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import catalogReducer from "./slices/catalogSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    catalog: catalogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
