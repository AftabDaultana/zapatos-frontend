import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllCategories,
  type Category,
} from "../../../services/categoryServices";

interface navigationMenuProps {
  activeMenu: { _id: string; name: string } | null;
  setActiveMenu: (menu: { _id: string; name: string } | null) => void;
}

function NavigationMenu({ activeMenu, setActiveMenu }: navigationMenuProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <nav className="flex w-full px-8 gap-10">
      <ul className="flex w-full items-center justify-center gap-6">
        {categories.map((category) => {
          return (
            <Link key={category._id} to={`/category/${category.slug}`}>
              <li
                onMouseEnter={() => setActiveMenu(category)}
                className={`flex items-center gap-1.5 py-4 text-lg leading-7 font-semibold cursor-pointer ${
                  activeMenu?._id === category._id
                    ? "text-neutral-300"
                    : "text-neutral-900"
                }`}
              >
                {category.name}
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
