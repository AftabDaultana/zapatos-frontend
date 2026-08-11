import { useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import HeaderMain from "./HeaderMain";
import NavigationMenu from "./NavigationMenu";
import MegaMenu from "../megaMenu/MegaMenu";

export default function DesktopHeader() {
  const [activeMenu, setActiveMenu] = useState<{
    id: number;
    name: string;
  } | null>(null);

  return (
    <header className="relative">
      <AnnouncementBar variant="desktop" />
      <HeaderMain />
      <div
        onMouseLeave={() => setActiveMenu(null)}
        className="relative
      "
      >
        <NavigationMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        {activeMenu && (
          <div className="absolute left-0 top-full w-full z-40 border-t border-neutral-200 bg-white shadow-lg">
            <MegaMenu categoryId={activeMenu.id} />
          </div>
        )}
      </div>
    </header>
  );
}
