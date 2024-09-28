"use client";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter

const Sidebar = () => {
  const pathname = usePathname(); // This will give you the current path

  // Array of sidebar items
  const sidebarItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/orders", label: "Orders", icon: ShoppingCart },
    { href: "/products", label: "Products", icon: Package },
    { href: "/categories", label: "Categories", icon: Users },
    { href: "/create-product", label: "Create Product", icon: Users },
  ];

  return (
    <div
      className="p-4 h-full shadow-md overflow-y-auto"
      style={{
        minHeight: "calc(100vh - 65px)",
      }}
    >
      <div className="flex flex-col gap-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 ease-in-out ${
                pathname === item.href
                  ? "bg-gradient-to-r from-main-500 to-main-300 text-white shadow-lg font-semibold"
                  : "text-gray-600 bg-gray-100 hover:bg-main-400 hover:text-white hover:shadow-md"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-base">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;