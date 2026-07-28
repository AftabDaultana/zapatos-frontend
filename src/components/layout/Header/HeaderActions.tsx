import type { ReactNode } from "react";
import { Phone, Mail, Info, User, Heart, ShoppingCart } from "lucide-react";
import ActionItem from "./ActionItem";

interface HeaderAction {
  icon: ReactNode;
  text?: string;
  dropDown?: boolean;
}

const desktopActions: HeaderAction[] = [
  {
    icon: <Phone size={24} />,
    text: "(804) 6623-9999",
  },
  {
    icon: <Mail size={24} />,
    text: "supportoursmallbusiness@g.com",
  },
  {
    icon: <Info size={24} />,
    text: "Info",
    dropDown: true,
  },
  {
    icon: <User size={24} />,
    dropDown: true,
  },
  {
    icon: <Heart size={24} />,
  },
  {
    icon: <ShoppingCart size={24} />,
  },
];

function Divider() {
  return <div className="h-6 w-px bg-neutral-900" />;
}

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      {desktopActions.map((action, index) => (
        <div key={index} className="flex items-center gap-3">
          <ActionItem
            icon={action.icon}
            text={action.text}
            dropDown={action.dropDown}
          />

          {index !== desktopActions.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
}
