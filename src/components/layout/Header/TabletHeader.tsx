import { Heart, Phone, ShoppingCart, User } from "lucide-react";
import AnnouncementBar from "./AnnouncementBar";
import HeaderLogo from "../../shared/Logo";
import MenuToggle from "./MenuToggle";
import SearchBar from "./SearchBar";

function Divider() {
  return <div className="h-6 w-px bg-neutral-100" />;
}

export default function TabletHeader() {
  return (
    <header>
      {/* Top row */}
      <div className="flex w-full h-14 items-center justify-between bg-neutral-900 px-6">
        <MenuToggle />
        <HeaderLogo variant="light" className="w-36.25 h-14" />
        <Phone size={24} className="text-neutral-100" />
        <Divider />
        <User size={24} className="text-neutral-100" />
        <Heart size={24} className="text-neutral-100" />
        <Divider />
        <ShoppingCart size={24} className="text-neutral-100" />
      </div>
      {/* Search bar */}
      <div className="px-6 py-3">
        <SearchBar />
      </div>
      {/* Announcement */}
      <AnnouncementBar variant="tablet" />
    </header>
  );
}
