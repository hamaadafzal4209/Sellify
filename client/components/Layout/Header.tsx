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
            <Link href="/" className="text-xl font-bold text-primary-500">
              Sellify
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                  className="text-primary-500"
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
                      className="text-base font-medium text-gray-900 hover:text-primary-500"
                    >
                      Home
                    </Link>
                    <Link
                      href="/shop"
                      className="text-base font-medium text-gray-900 hover:text-primary-500"
                    >
                      Shop
                    </Link>
                    <Link
                      href="/categories"
                      className="text-base font-medium text-gray-900 hover:text-primary-500"
                    >
                      Categories
                    </Link>
                  </nav>
                  <div className="mt-6">
                    <Link href="/login" passHref>
                      <Button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-500 hover:bg-[#e63b61]">
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-10">
            <Link
              href="/"
              className="text-base font-medium text-gray-900 hover:text-primary-600"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-base font-medium text-gray-900 hover:text-primary-600"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className="text-base font-medium text-gray-900 hover:text-primary-600"
            >
              Categories
            </Link>
          </nav>

          {/* Login Button for Desktop */}
          <div className="hidden md:flex items-center ml-8">
            <Link href="/login" passHref>
              <Button
                variant="ghost"
                className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-500 hover:bg-primary-600"
              >
                Login
              </Button>
            </Link>
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
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search for products"
            type="search"
          />
        </form>
      </div>
    </header>
  );
}
