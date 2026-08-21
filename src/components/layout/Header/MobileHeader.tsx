import { Heart, Phone, ShoppingCart } from "lucide-react";
import HeaderLogo from "../../shared/Logo";
import MenuToggle from "./MenuToggle";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Button from "../../ui/Button";
import CartModal from "../cartModal/cartModal";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectCartItemCount } from "../../../app/selectors/cartSelectors";
import { Link } from "react-router-dom";

function Divider() {
  return <div className="h-6 w-px bg-neutral-100" />;
}

export default function MobileHeader() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = useAppSelector(selectCartItemCount);
  return (
    <header className="border-b border-neutral-700">
      <div className="flex w-full h-12 items-center justify-between px-4 bg-neutral-900">
        <MenuToggle />
        <HeaderLogo variant="light" className="w-24.75 h-9.5" link="/" />
        <Divider />
        <Phone size={24} className="text-neutral-100" />
        <Divider />
        <Link to={"/wishlist"}>
          <Heart size={24} className="text-neutral-100" />
        </Link>
        <Divider />
        <div className="relative">
          <Button type="button" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={24} className="text-neutral-100" />
          </Button>
          {cartItemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-50 text-xs font-medium text-neutral-950">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center px-4 py-3">
        <SearchBar />
      </div>
      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
    </header>
  );
}
