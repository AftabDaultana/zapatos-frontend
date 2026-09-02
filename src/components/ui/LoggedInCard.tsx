import { User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import Button from "./Button";
import { logoutUser } from "../../app/slices/userSlice";
import { Link } from "react-router-dom";

interface LoggedInCardProps {
  onLogOut: () => void;
  onClose: () => void;
}

export default function LoggedInCard({ onLogOut, onClose }: LoggedInCardProps) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  if (!currentUser) return null;

  return (
    <div className="w-72 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
      {/* Header */}
      <div className="border-b border-neutral-100 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          My Account
        </p>
      </div>

      <div className="p-4">
        {/* User Information */}
        <div className="flex flex-col items-center rounded-lg bg-neutral-50 px-4 py-5 text-center">
          <div className="h-14 w-14 overflow-hidden rounded-full bg-neutral-200">
            {currentUser.profilePicture ? (
              <img
                src={currentUser.profilePicture}
                alt={currentUser.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User size={24} className="text-neutral-500" />
              </div>
            )}
          </div>

          <div className="mt-3 min-w-0 w-full">
            <p className="truncate text-sm font-medium text-neutral-950">
              {currentUser.name}
            </p>

            <p className="mt-1 truncate text-xs text-neutral-500">
              {currentUser.email}
            </p>

            {currentUser.phoneNumber && (
              <p className="mt-1 truncate text-xs text-neutral-500">
                {currentUser.phoneNumber}
              </p>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-4 flex flex-col gap-2">
          {currentUser.role === "admin" && (
            <Link to="/admin" onClick={onClose}>
              <Button
                type="button"
                variant="dark"
                className="h-10 w-full text-sm font-medium transition-all duration-200"
              >
                Admin Dashboard
              </Button>
            </Link>
          )}

          <Link to="/orders" onClick={onClose}>
            <Button
              type="button"
              variant="dark"
              className="h-10 w-full text-sm font-medium transition-all duration-200"
            >
              View Orders
            </Button>
          </Link>

          <Link to="/profile" onClick={onClose}>
            <Button
              type="button"
              variant="dark"
              className="h-10 w-full text-sm font-medium transition-all duration-200"
            >
              View Profile
            </Button>
          </Link>
        </div>

        {/* Logout */}
        <div className="mt-4 border-t border-neutral-200 pt-4">
          <Button
            type="button"
            variant="light"
            onClick={() => {
              dispatch(logoutUser());
              onLogOut();
            }}
            className="h-10 w-full text-sm font-medium transition-all duration-200"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
