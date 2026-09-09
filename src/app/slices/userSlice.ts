import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../data/users";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

interface UserState {
  users: User[];
  currentUser: User | null;
  authInitialized: boolean;
}

export const getStoredUsers = (): User[] => {
  const storedUsers = localStorage.getItem("users");

  if (!storedUsers) {
    return users;
  }

  try {
    return JSON.parse(storedUsers);
  } catch (error) {
    console.error("Failed to parse stored users", error);
    localStorage.removeItem("users");
    return users;
  }
};

export const getStoredUser = (): User | null => {
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
  users: getStoredUsers(),
  currentUser: null,
  authInitialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (!state.currentUser) return;

      const updatedCurrentUser = {
        ...state.currentUser,
        ...action.payload,
      };

      state.currentUser = updatedCurrentUser;

      const storedUsers = getStoredUsers();

      const updatedUsers = storedUsers.map((user) =>
        user._id === updatedCurrentUser._id ? updatedCurrentUser : user,
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    },
    logoutUser: (state) => {
      if (state.currentUser) {
        const storedUsers = getStoredUsers();
        const updatedUsers = storedUsers.map((user) =>
          user._id === state.currentUser?._id
            ? { ...user, isLoggedIn: false }
            : user,
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload);

      localStorage.setItem("users", JSON.stringify(state.users));
    },
    setAuthInitialized: (state, action: PayloadAction<boolean>) => {
      state.authInitialized = action.payload;
    },
  },
});

export const {
  setUser,
  logoutUser,
  updateUser,
  deleteUser,
  setAuthInitialized,
} = userSlice.actions;
export default userSlice.reducer;
