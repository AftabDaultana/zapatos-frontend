import { Heart, Phone, ShoppingCart } from "lucide-react";
import HeaderLogo from "../../shared/Logo";
import MenuToggle from "./MenuToggle";
import SearchBar from "./SearchBar";

function Divider() {
  return <div className="h-6 w-px bg-neutral-100" />;
}

export default function MobileHeader() {
  return (
    <header>
      {/* top row */}
      <div className="flex w-full h-12 items-center justify-between px-4 bg-neutral-900">
        <MenuToggle />
        <HeaderLogo variant="light" className="w-24.75 h-9.5" />
        <Divider />
        <Phone size={24} className="text-neutral-100" />
        <Divider />
        <Heart size={24} className="text-neutral-100" />
        <Divider />
        <ShoppingCart size={24} className="text-neutral-100" />
      </div>
      {/* search bar */}
      <div className="flex items-center px-4 py-3">
        <SearchBar />
      </div>
    </header>
  );
}
