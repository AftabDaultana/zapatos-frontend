import { useState, type ComponentType } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import Logo from "../../shared/Logo";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { logoutUser } from "../../../app/slices/userSlice";

interface NavigationItem {
  label: string;
  icon?: ComponentType<{ size?: number }>;
  path?: string;
  children?: NavigationItem[];
}

interface AdminSidebarProps {
  isOpen: boolean;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    label: "Products",
    icon: Package,
    path: "/admin/products",
    children: [
      {
        label: "Product Categories",
        path: "/admin/categories",
        children: [
          {
            label: "SubCategory",
            path: "/admin/subcategories",
          },
        ],
      },
    ],
  },
  {
    label: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    path: "/admin/orders",
  },
];

const bottomNavigationItems: NavigationItem[] = [
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/profile",
  },
  {
    label: "Log out",
    icon: LogOut,
  },
];

function NavigationList({
  items,
  level = 0,
  onLogout,
}: {
  items: NavigationItem[];
  level?: number;
  onLogout?: () => void;
}) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggleItem = (label: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label}>
            {item.children ? (
              <div
                className={`flex items-center rounded-md transition ${
                  location.pathname === item.path
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                <NavLink
                  to={item.path!}
                  end
                  className="flex flex-1 items-center gap-3 px-3 py-2"
                  style={{ paddingLeft: `${12 + level * 16}px` }}
                >
                  {Icon && <Icon size={18} />}
                  <span>{item.label}</span>
                </NavLink>

                <Button
                  type="button"
                  variant="none"
                  onClick={() => toggleItem(item.label)}
                  className="rounded-md p-2 text-neutral-400 transition hover:bg-neutral-700 hover:text-white"
                  aria-label={`Toggle ${item.label} submenu`}
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openItems[item.label] ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            ) : item.path ? (
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 transition ${
                    isActive
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                  }`
                }
                style={{ paddingLeft: `${12 + level * 16}px` }}
              >
                {Icon && <Icon size={18} />}
                <span>{item.label}</span>
              </NavLink>
            ) : (
              <Button
                type="button"
                variant="none"
                onClick={item.label === "Log out" ? onLogout : undefined}
                className="flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
                style={{ paddingLeft: `${12 + level * 16}px` }}
              >
                {Icon && <Icon size={18} />}
                <span>{item.label}</span>
              </Button>
            )}

            {item.children && openItems[item.label] && (
              <NavigationList
                items={item.children}
                level={level + 1}
                onLogout={onLogout}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 h-screen w-64 bg-neutral-950 text-neutral-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-neutral-800 px-6 py-5">
          <Logo variant="light" link="/" />
        </div>

        <nav className="flex flex-1 flex-col px-4 py-6">
          <NavigationList items={navigationItems} />

          <div className="mt-auto border-t border-neutral-800 pt-4">
            <NavigationList
              items={bottomNavigationItems}
              onLogout={handleLogout}
            />
          </div>
        </nav>
      </div>
    </aside>
  );
}
