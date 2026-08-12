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
    <Button type="button" onClick={onClick} className="flex items-center gap-2">
      {icon}
      {text && (
        <span className="text-sm leading-6 text-neutral-700">{text}</span>
      )}
      {dropDown && (
        <ChevronDown
          size={24}
          className="text-neutral-700"
          aria-hidden="true"
        />
      )}
    </Button>
  );
}
