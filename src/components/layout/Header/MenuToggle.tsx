import { Menu } from "lucide-react";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

export default function MenuToggle() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <button onClick={() => setSidebarOpen(true)}>
        <Menu size={24} className="text-neutral-100" aria-hidden="true" />
      </button>

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
