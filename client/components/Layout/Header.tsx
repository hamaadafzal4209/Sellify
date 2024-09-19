"use client";
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-[#FE426D]">
              EcoShop
            </Link>
          </div>

          {/* Search Bar for Large Screens */}
          <div className="hidden lg:flex-1 lg:flex items-center justify-center mx-4">
            <div className="relative max-w-lg w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#FE426D] focus:border-[#FE426D] sm:text-sm"
                  placeholder="Search for products"
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-[#FE426D]"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className={`w-[300px] sm:w-[400px] bg-white ${
                  isSheetOpen ? "animate-sheet-open" : "animate-sheet-close"
                }`}
                onClose={() => setIsSheetOpen(false)}
              >
                <div className="flex flex-col gap-4 pt-10 px-4">
                  <nav className="flex flex-col gap-4">
                    <Link
                      href="/"
                      className="text-base font-medium text-gray-900 hover:text-[#FE426D]"
                    >
                      Home
                    </Link>
                    <Link
                      href="/shop"
                      className="text-base font-medium text-gray-900 hover:text-[#FE426D]"
                    >
                      Shop All
                    </Link>
                    <Link
                      href="/categories"
                      className="text-base font-medium text-gray-900 hover:text-[#FE426D]"
                    >
                      Categories
                    </Link>
                  </nav>
                  <div className="mt-6">
                    <Button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#FE426D] hover:bg-[#e63b61]">
                      Login
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-10">
            <Link
              href="/"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Shop All
            </Link>
            <Link
              href="/categories"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Categories
            </Link>
          </nav>

          {/* Login Button for Desktop */}
          <div className="hidden md:flex items-center ml-8">
            <Button
              variant="ghost"
              className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#FE426D] hover:bg-[#e63b61]"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="pb-4 lg:pb-0">
        <form className="mx-auto px-4 sm:px-6 lg:px-8 block lg:hidden relative">
          <div className="absolute inset-y-0  pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            id="search"
            name="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#FE426D] focus:border-[#FE426D] sm:text-sm"
            placeholder="Search for products"
            type="search"
          />
        </form>
      </div>
    </header>
  );
}
