import { useState, type ReactNode } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import AuthModal from "../ui/Auth/AuthModal";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRouteProps) {
  const [showAuth, setShowAuth] = useState(false);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  if (currentUser) return children;

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-950">
            Login Required
          </h1>

          <p className="mt-2 text-neutral-600">
            Please log in to access this page.
          </p>

          <button
            type="button"
            onClick={() => setShowAuth(true)}
            className="mt-6 border border-neutral-950 bg-neutral-950 px-6 py-3 text-sm font-medium text-neutral-50"
          >
            Login
          </button>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
