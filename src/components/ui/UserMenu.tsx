import Button from "./Button";
import { useState, useRef, useEffect } from "react";
import LoggedInCard from "./LoggedInCard";
import LoggedOutCard from "./LoggedOutCard";
import { User, ChevronDown } from "lucide-react";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const userMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={userMenuRef} className="relative">
      <Button
        type="button"
        variant="none"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        className="group flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-700 transition-all duration-200 hover:bg-gray-300 hover:text-neutral-950 md:text-neutral-50 xl:text-neutral-950"
      >
        <User size={24} />
        <ChevronDown size={24} />
      </Button>
      {isOpen && (
        <div className="absolute left-0 md:left-auto md:right-0 top-full z-50 mt-2 w-64 bg-[#e7e7e7] shadow-lg">
          {currentUser ? (
            <LoggedInCard
              onLogOut={() => {
                setIsOpen(false);
              }}
              onClose={() => setIsOpen(false)}
            />
          ) : (
            <LoggedOutCard />
          )}
        </div>
      )}
    </div>
  );
}
