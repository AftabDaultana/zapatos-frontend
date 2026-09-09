import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface NavItem {
  _id: string;
  name: string;
}

interface navigationMenuProps {
  activeMenu: { _id: string; name: string } | null;
  setActiveMenu: (menu: { _id: string; name: string } | null) => void;
}

const navItems: NavItem[] = [
  { _id: "1", name: "MEN" },
  { _id: "2", name: "WOMEN" },
  { _id: "3", name: "KIDS" },
  { _id: "4", name: "BRANDS" },
  { _id: "5", name: "SANDALS" },
];

function NavigationMenu({ activeMenu, setActiveMenu }: navigationMenuProps) {
  return (
    <nav className="flex w-full px-8 gap-10">
      <ul className="flex w-full items-center justify-center gap-6">
        {navItems.map((navItem) => {
          return (
            <Link to={`/category/${navItem.name.toLowerCase()}`}>
              <li
                key={navItem._id}
                onMouseEnter={() => setActiveMenu(navItem)}
                className={`flex items-center gap-1.5 py-4 text-lg leading-7 font-semibold cursor-pointer ${
                  activeMenu?._id === navItem._id
                    ? "text-neutral-300"
                    : "text-neutral-900"
                }`}
              >
                {navItem.name}
                <ChevronDown size={16} />
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
