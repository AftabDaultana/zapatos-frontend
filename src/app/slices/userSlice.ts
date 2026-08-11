import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

interface UserState {
  currentUser: User | null;
}

const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem("currentUser");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse stored user", error);
    localStorage.removeItem("currentUser");
    return null;
  }
};

const initialState: UserState = {
  currentUser: getStoredUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          ...action.payload,
        };
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { setUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
