import { createSlice } from "@reduxjs/toolkit";
import { users as initialUsers } from "../../data/users";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

interface UserState {
  users: User[];
  currentUser: User | null;
}

const getStoredUsers = (): User[] => {
  const storedUsers = localStorage.getItem("users");

  if (!storedUsers) {
    return initialUsers;
  }

  try {
    return JSON.parse(storedUsers);
  } catch (error) {
    console.error("Failed to parse stored users", error);
    localStorage.removeItem("users");
    return initialUsers;
  }
};

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

export const { addUser, setUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
