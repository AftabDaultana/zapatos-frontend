import { useAppDispatch } from "./reduxHooks";
import { logoutUserApi } from "../services/authServices";
import { logoutUser } from "../app/slices/userSlice";
import { resetCart } from "../app/slices/cartSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logoutUserApi();
      dispatch(logoutUser());
      dispatch(resetCart());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return handleLogout;
};
