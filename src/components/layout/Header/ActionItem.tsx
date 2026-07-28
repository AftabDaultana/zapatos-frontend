import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface ActionItemProps {
  icon: ReactNode;
  text?: string;
  dropDown?: boolean;
}

export default function ActionItem({ icon, text, dropDown }: ActionItemProps) {
  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
}
