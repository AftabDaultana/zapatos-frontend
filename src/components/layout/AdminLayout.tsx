import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar/AdminSidebar";
import AdminHeader from "../admin/AdminHeader/AdminHeader";
import { useState } from "react";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-neutral-100">
      <AdminSidebar isOpen={isSidebarOpen} />

      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <AdminHeader
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 bg-neutral-200 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
