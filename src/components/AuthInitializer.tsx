import { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { getCurrentUser } from "../services/userServices";
import {
  logoutUser,
  setAuthInitialized,
  setUser,
} from "../app/slices/userSlice";
import { fetchProducts } from "../app/slices/catalogSlice";
import { fetchWishlist } from "../app/slices/wishlistSlice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      dispatch(fetchProducts());

      try {
        const response = await getCurrentUser();

        dispatch(setUser(response.data));
        dispatch(fetchWishlist());
      } catch {
        dispatch(logoutUser());
      } finally {
        dispatch(setAuthInitialized(true));
      }
    };

    restoreUser();
  }, [dispatch]);

  return null;
}
