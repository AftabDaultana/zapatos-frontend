import { setUser } from "../app/slices/userSlice";
import { getCurrentUser } from "../services/userServices";
import { useAppDispatch } from "./reduxHooks";

export const useViewProfile = () => {
  const dispatch = useAppDispatch();

  const handleViewProfile = async (): Promise<boolean> => {
    try {
      const response = await getCurrentUser();

      dispatch(setUser(response.data));

      return true;
    } catch (error: any) {
      console.error(
        "Failed to fetch current user: ",
        error.response.data.message || error.message,
      );

      return false;
    }
  };

  return handleViewProfile;
};
