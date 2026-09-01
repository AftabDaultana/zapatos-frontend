import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function AdminProtectedRoute() {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  if (!currentUser?.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
