import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-neutral-200 flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}
