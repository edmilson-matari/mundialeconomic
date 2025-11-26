import { useState } from "react";
import AdminSidebar from "../AdminSidebar";
import AdminNavbar from "../AdminNav";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile only
  const { isAdmin, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAdmin) return <h1>Get out of here</h1>;

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        logOut={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <AdminNavbar
          onMenuClick={() => setSidebarOpen(true)}
          name="Edmilson Matari"
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
