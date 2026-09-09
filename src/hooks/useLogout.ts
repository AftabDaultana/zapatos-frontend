import { useAppDispatch } from "./reduxHooks";
import { logoutUserApi } from "../services/authServices";
import { logoutUser } from "../app/slices/userSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logoutUserApi();
      dispatch(logoutUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return handleLogout;
};
