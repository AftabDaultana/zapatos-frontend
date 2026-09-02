import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import Button from "../../ui/Button";

interface ActionItemProps {
  icon: ReactNode;
  text?: string;
  dropDown?: boolean;
  onClick?: () => void;
}

export default function ActionItem({
  icon,
  text,
  dropDown,
  onClick,
}: ActionItemProps) {
  return (
    <Button
      type="button"
      variant="none"
      onClick={onClick}
      className="group flex items-center gap-2 rounded-lg px-3 py-2 text-neutral-700 transition-all duration-200 hover:bg-gray-300 hover:text-neutral-950"
    >
      <span className="transition-colors duration-200 group-hover:text-neutral-950">
        {icon}
      </span>

      {text && (
        <span className="text-sm leading-5 text-neutral-700 transition-colors duration-200 group-hover:text-neutral-950">
          {text}
        </span>
      )}

      {dropDown && (
        <ChevronDown
          size={20}
          className="text-neutral-700 transition-all duration-200 group-hover:text-neutral-950"
          aria-hidden="true"
        />
      )}
    </Button>
  );
}
