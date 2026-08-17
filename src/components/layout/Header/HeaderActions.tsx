import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Phone, Mail, Info, Heart, ShoppingCart } from "lucide-react";
import ActionItem from "./ActionItem";
import UserMenu from "../../ui/UserMenu";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectCartItemCount } from "../../../app/selectors/cartSelectors";
import CartModal from "../cartModal/cartModal";

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
  const [infoOpen, setInfoOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const cartItemCount = useAppSelector(selectCartItemCount);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setInfoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center gap-3">
      {desktopActions.map((action, index) => (
        <div
          ref={index === 2 ? infoRef : undefined}
          key={index}
          className={`flex items-center gap-3 ${index === 2 ? "relative" : ""}`}
        >
          {index === desktopActions.length - 1 ? (
            <div className="relative">
              <ActionItem
                icon={action.icon}
                text={action.text}
                dropDown={action.dropDown}
                onClick={() => setCartOpen((prev) => !prev)}
              />

              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-950 text-xs text-neutral-50">
                  {cartItemCount}
                </span>
              )}
            </div>
          ) : (
            <ActionItem
              icon={action.icon}
              text={action.text}
              dropDown={action.dropDown}
              onClick={
                index === 2 ? () => setInfoOpen((prev) => !prev) : undefined
              }
            />
          )}

          {index === 2 && infoOpen && (
            <div className="absolute left-auto right-0 top-full z-50 mt-2 w-64 bg-[#e7e7e7] shadow-lg p-6">
              <div className="flex flex-col gap-4">
                <Link
                  to="/about"
                  onClick={() => setInfoOpen(false)}
                  className="text-sm text-neutral-700 hover:text-neutral-950"
                >
                  About Us
                </Link>

                <Link
                  to="/shipping"
                  onClick={() => setInfoOpen(false)}
                  className="text-sm text-neutral-700 hover:text-neutral-950"
                >
                  Shipping & Delivery
                </Link>

                <Link
                  to="/returns"
                  onClick={() => setInfoOpen(false)}
                  className="text-sm text-neutral-700 hover:text-neutral-950"
                >
                  Returns & Exchanges
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setInfoOpen(false)}
                  className="text-sm text-neutral-700 hover:text-neutral-950"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}

          {index == 2 && (
            <>
              <Divider />
              <div onMouseDown={() => setInfoOpen(false)}>
                <UserMenu />
              </div>
              <Divider />
            </>
          )}

          {index !== desktopActions.length - 1 && index !== 2 && <Divider />}
        </div>
      ))}
      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
    </div>
  );
}
