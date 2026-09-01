import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../data/users";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

interface UserState {
  users: User[];
  currentUser: User | null;
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
  currentUser: getStoredUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    setUser: (state, action: PayloadAction<User>) => {
      const storedUsers = getStoredUsers();
      const updatedUsers = storedUsers.map((user) =>
        user.id === action.payload.id ? { ...user, isLoggedIn: true } : user,
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const updatedCurrentUser = { ...action.payload, isLoggedIn: true };
      state.currentUser = updatedCurrentUser;
      localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
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
        user.id === updatedCurrentUser.id ? updatedCurrentUser : user,
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    },
    logoutUser: (state) => {
      if (state.currentUser) {
        const storedUsers = getStoredUsers();
        const updatedUsers = storedUsers.map((user) =>
          user.id === state.currentUser?.id
            ? { ...user, isLoggedIn: false }
            : user,
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);

      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const { addUser, setUser, logoutUser, updateUser, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;
