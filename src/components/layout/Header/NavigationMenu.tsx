import { ChevronDown } from "lucide-react";

interface NavItem {
  id: number;
  name: string;
}

interface navigationMenuProps {
  activeMenu: { id: number; name: string } | null;
  setActiveMenu: (menu: { id: number; name: string } | null) => void;
}

const navItems: NavItem[] = [
  { id: 1, name: "MEN" },
  { id: 2, name: "WOMEN" },
  { id: 3, name: "KIDS" },
  { id: 4, name: "BRANDS" },
  { id: 5, name: "SANDALS" },
];

function NavigationMenu({ activeMenu, setActiveMenu }: navigationMenuProps) {
  return (
    <nav className="flex w-full px-8 gap-10">
      <ul className="flex w-full items-center justify-center gap-6">
        {navItems.map((navItem) => {
          return (
            <li
              key={navItem.id}
              onMouseEnter={() => setActiveMenu(navItem)}
              className={`flex items-center gap-1.5 py-4 text-lg leading-7 font-semibold cursor-pointer ${
                activeMenu?.id === navItem.id
                  ? "text-neutral-300"
                  : "text-neutral-900"
              }`}
            >
              {navItem.name}
              <ChevronDown size={16} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
