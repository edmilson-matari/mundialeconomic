"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  FileText,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  FolderOpen,
  ShoppingBag,
  Users,
  BarChart3,
} from "lucide-react";
import { clsx } from "clsx";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  submenu?: MenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      active: true,
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "Lojas",
      href: "/admin/stores",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Usuários",
      href: "/admin/users",
    },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics" },
    {
      icon: <FolderOpen className="w-5 h-5" />,
      label: "Páginas",
      submenu: ["Início", "Categórias", "Lojas"],
    },
    { icon: <Shield className="w-5 h-5" />, label: "Auth" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="text-xl font-bold">Dasher</span>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* User */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-12 h-12 rounded-full ring-2 ring-green-500"
            />
            <div>
              <h3 className="font-semibold">Jitu Chauhan</h3>
              <p className="text-xs text-gray-500">Free Version - 1 Month</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item, i) => (
            <a
              key={i}
              href={item.href || "#"}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition",
                item.active
                  ? "bg-green-50 text-green-600 border border-green-200"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
