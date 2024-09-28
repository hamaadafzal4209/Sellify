"use client";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter

const Sidebar = () => {
  const pathname = usePathname(); // This will give you the current path

  return (
    <div
      className="p-4 h-full shadow-md overflow-y-auto"
      style={{
        minHeight: "calc(100vh - 65px)",
      }}
    >
      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === "/"
              ? "bg-gradient-to-r from-main-500 to-main-300 text-white shadow-lg font-semibold"
              : "text-gray-600 bg-gray-100 hover:bg-main-400 hover:text-white hover:shadow-md"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-base">Dashboard</span>
        </Link>

        <Link
          href="/orders"
          className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === "/orders"
              ? "bg-gradient-to-r from-main-500 to-main-300 text-white shadow-lg font-semibold"
              : "text-gray-600 bg-gray-100 hover:bg-main-400 hover:text-white hover:shadow-md"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-base">Orders</span>
        </Link>

        <Link
          href="/products"
          className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === "/products"
              ? "bg-gradient-to-r from-main-500 to-main-300 text-white shadow-lg font-semibold"
              : "text-gray-600 bg-gray-100 hover:bg-main-400 hover:text-white hover:shadow-md"
          }`}
        >
          <Package className="w-5 h-5" />
          <span className="text-base">Products</span>
        </Link>

        <Link
          href="/categories"
          className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 ease-in-out ${
            pathname === "/categories"
              ? "bg-gradient-to-r from-main-500 to-main-300 text-white shadow-lg font-semibold"
              : "text-gray-600 bg-gray-100 hover:bg-main-400 hover:text-white hover:shadow-md"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-base">Categories</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
