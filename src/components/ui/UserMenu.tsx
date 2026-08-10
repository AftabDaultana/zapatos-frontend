import Button from "./Button";
import { useState } from "react";
import LoggedInCard from "./LoggedInCard";
import LoggedOutCard from "./LoggedOutCard";
import { User, ChevronDown } from "lucide-react";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  return (
    <div className="relative">
      <Button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
      >
        <User size={24} />
        <ChevronDown size={24} />
      </Button>
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 bg-white shadow-lg">
          {currentUser ? (
            <LoggedInCard
              onLogOut={() => {
                setIsOpen(false);
              }}
            />
          ) : (
            <LoggedOutCard />
          )}
        </div>
      )}
    </div>
  );
}
