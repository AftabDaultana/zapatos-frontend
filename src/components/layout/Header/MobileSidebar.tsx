import { X, ChevronDown, Mail } from "lucide-react";
import { categories } from "../../../data/categories";
import { subCategories } from "../../../data/subCategories";
import { useState } from "react";
import UserMenu from "../../ui/UserMenu";
import { Link } from "react-router-dom";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory((prev) => {
      return prev === categoryId ? null : categoryId;
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <aside className="fixed flex flex-col gap-6 left-0 top-0 h-full w-[dvw] bg-white z-50 p-6 overflow-auto">
        <div className="flex flex-col gap-6 py-5 border-b border-b-neutral-300">
          <div className="flex justify-between p-5 border border-neutral-300 md:border-none md:p-0">
            <UserMenu />
            <button onClick={onClose}>
              <X
                size={24}
                className="cursor-pointer md:absolute md:top-5 md:right-6"
              />
            </button>
          </div>
          <h2 className="text-xl font-semibold md:absolute md:top-5">Menu</h2>
        </div>

        <div>
          <nav>
            <ul className="flex flex-col gap-6 py-5">
              {categories.map((category) => {
                const categoryItems = subCategories.filter(
                  (item) => item.categoryId === category.id,
                );
                return (
                  <li key={category.id}>
                    <button className="flex gap-2 items-center cursor-pointer">
                      <Link
                        to={`/category/${category.name.toLowerCase()}`}
                        onClick={onClose}
                      >
                        {category.name}
                      </Link>
                      <ChevronDown
                        className={`transition-transform duration-200 ${
                          expandedCategory === category.id ? "rotate-180" : ""
                        }`}
                        size={18}
                        onClick={() => toggleCategory(category.id)}
                      />
                    </button>
                    {expandedCategory === category.id &&
                      categoryItems.length > 0 && (
                        <ul className="flex flex-col gap-2 p-2">
                          {categoryItems.map((subCategory) => {
                            return (
                              <Link
                                to={`/category/${category.name.toLowerCase()}/${subCategory.name.toLowerCase()}`}
                              >
                                <li key={subCategory.id}>
                                  <button className="cursor-pointer">
                                    {subCategory.name}
                                  </button>
                                </li>
                              </Link>
                            );
                          })}
                        </ul>
                      )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="flex gap-2 py-5 border-t border-t-neutral-300">
          <Mail size={24} />
          <p>supportoursmallbusiness@gmail.com</p>
        </div>
      </aside>
    </>
  );
}
