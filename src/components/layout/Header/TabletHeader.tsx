import { Heart, Phone, ShoppingCart } from "lucide-react";
import AnnouncementBar from "./AnnouncementBar";
import HeaderLogo from "../../shared/Logo";
import MenuToggle from "./MenuToggle";
import SearchBar from "./SearchBar";
import UserMenu from "../../ui/UserMenu";
import { useState } from "react";
import Button from "../../ui/Button";
import CartModal from "../cartModal/cartModal";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectCartItemCount } from "../../../app/selectors/cartSelectors";
import { Link } from "react-router-dom";

function Divider() {
  return <div className="h-6 w-px bg-neutral-100" />;
}

export default function TabletHeader() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = useAppSelector(selectCartItemCount);
  return (
    <header className="border-b border-neutral-700">
      <div className="flex w-full h-14 items-center justify-between bg-neutral-900 px-6">
        <MenuToggle />
        <HeaderLogo variant="light" className="w-36.25 h-14" />
        <Phone size={24} className="text-neutral-100" />
        <Divider />
        <UserMenu />
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
      <div className="px-6 py-3">
        <SearchBar />
      </div>
      <AnnouncementBar variant="tablet" />
      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
    </header>
  );
}
