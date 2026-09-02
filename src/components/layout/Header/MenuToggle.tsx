import { Menu } from "lucide-react";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import Button from "../../ui/Button";

export default function MenuToggle() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Button className="cursor-pointer" onClick={() => setSidebarOpen(true)}>
        <Menu size={24} className="text-neutral-100" aria-hidden="true" />
      </Button>

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
