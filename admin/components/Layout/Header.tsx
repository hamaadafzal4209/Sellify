"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  AlignJustify,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const Header = () => {
  const [activeLink, setActiveLink] = useState("/"); // Set default active link

  // Function to handle active link change
  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  return (
    <div>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <span className="font-bold section-heading">Sellify</span>
          </Link>
          <div className="flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/assets/profile-avatar.png" alt="@user" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Admin User
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sheet Component with Links */}
            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <AlignJustify />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="!p-0 !pt-20 !w-[300px]">
                    {/* sidebar component */}
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
