import { Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import Button from "../../ui/Button";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-neutral-200 bg-neutral-950 px-6">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          onClick={onToggleSidebar}
          className="flex items-center justify-center text-neutral-700 transition hover:text-neutral-950 p-2 rounded-full bg-neutral-200"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </Button>

        <Link to="/admin" className="text-lg font-semibold text-neutral-50">
          Admin Dashboard
        </Link>
      </div>

      <Link
        to="/admin/profile"
        aria-label="View admin profile"
        className="block h-9 w-9 overflow-hidden rounded-full bg-neutral-200"
      >
        <div className="h-9 w-9 overflow-hidden rounded-full bg-neutral-200">
          {currentUser?.profilePicture ? (
            <img
              src={currentUser.profilePicture}
              alt={currentUser.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-neutral-600">
              <User size={24} />
            </div>
          )}
        </div>
      </Link>
    </header>
  );
}
