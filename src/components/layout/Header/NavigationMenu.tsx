import { ChevronDown } from "lucide-react";
const navItems: string[] = [
  "MEN",
  "KIDS",
  "WOMEN",
  "SPORT",
  "BRANDs",
  "SANDALS",
];

function NavigationMenu() {
  return (
    <nav className="flex w-full px-8 gap-10">
      <ul className="flex w-full items-center justify-center gap-6">
        {navItems.map((navItem) => {
          return (
            <li
              key={navItem}
              className="flex items-center gap-1.5 text-lg leading-7 font-semibold text-neutral-900"
            >
              {navItem}
              <ChevronDown size={16} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
