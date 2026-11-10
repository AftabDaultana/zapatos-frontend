import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setAuthInitialized } from "../../app/slices/userSlice";
import { getCurrentUser } from "../../services/userServices";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await getCurrentUser();
        console.log("Google user:", response.data);
        console.log("Profile picture:", response.data.profilePicture);

        dispatch(setUser(response.data));
        dispatch(setAuthInitialized(true));

        navigate("/", { replace: true });
      } catch (error) {
        dispatch(setAuthInitialized(true));
        navigate("/login?error=google_auth_failed", {
          replace: true,
        });
      }
    };

    restoreSession();
  }, [dispatch, navigate]);

  return <div>Signing you in...</div>;
};

export default AuthSuccess;
