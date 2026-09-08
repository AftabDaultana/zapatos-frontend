import { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { getCurrentUser } from "../services/userServices";
import { setUser } from "../app/slices/userSlice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const response = await getCurrentUser();

        dispatch(setUser(response.data));
      } catch (error) {
        console.log("No active user session.");
      }
    };

    restoreUser();
  }, [dispatch]);

  return null;
}
