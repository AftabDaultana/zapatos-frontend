import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-neutral-200 bg-neutral-950 px-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex items-center justify-center text-neutral-700 transition hover:text-neutral-950 p-2 rounded-full bg-neutral-200"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>

        <Link to="/admin" className="text-lg font-semibold text-neutral-50">
          Admin Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-neutral-200" />
      </div>
    </header>
  );
}
