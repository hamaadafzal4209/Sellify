"use client";
import { useEffect, useState } from "react";
import { CircleUser, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/redux/Features/user/userAction";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAllProducts } from "@/app/redux/Features/product/productAction";
import Image from "next/image";
import CartSidebar from "../Cart/CartSidebar";
import WishListSidebar from "../WishList/WishListSidebar";

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
    toast.success("Logout Successful");
  };

  return (
    <header className="bg-white shadow-md z-50">
      <div className="main-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-main-500">
              Sellify
            </Link>
          </div>

          {/* Search Bar for Large Screens */}
          <div className="hidden lg:flex-1 lg:flex items-center justify-center mx-4 relative z-50">
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 sm:text-sm"
                  placeholder="Search for products"
                  type="search"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              {/* Display filtered product results below the search bar */}
              {searchQuery && (
                <div className="absolute inset-x-0 top-full mt-1 bg-white shadow-lg rounded-lg z-50">
                  <ul className="max-w-lg mx-auto space-y-4 py-4 px-3 max-h-[70vh] overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <li
                          key={product.id}
                          className="flex items-center gap-4"
                        >
                          <Image
                            width={20}
                            height={20}
                            src={product.images?.[0]?.url}
                            alt={product.name}
                            className="h-12 w-12 object-contain rounded-md"
                          />
                          <Link
                            href={`/products/${product._id}`}
                            className="text-base font-medium text-gray-900 hover:text-main-500 line-clamp-2"
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-600">No products found.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-base font-medium text-gray-900 hover:text-main-600"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-base font-medium text-gray-900 hover:text-main-600"
              >
                Products
              </Link>
            </nav>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-main-500 bg-gray-100"
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
                        className="text-base font-medium text-gray-900 hover:text-main-500"
                      >
                        Home
                      </Link>
                      <Link
                        href="/products"
                        className="text-base font-medium text-gray-900 hover:text-main-500"
                      >
                        Products
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            {/* Profile Dropdown */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="md:ml-8 flex items-center gap-6 md:gap-8">
                  <CartSidebar />
                  <WishListSidebar />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/assets/user.png" alt="@user" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 bg-white"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.name} {/* Display real user name */}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email} {/* Display real user email */}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem onClick={handleLogout}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link href="/login" passHref>
                  <CircleUser className="hover:text-main-500" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search input and results for mobile screens */}
      <div className="block lg:hidden relative px-4 pb-4 z-50">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 sm:text-sm"
            placeholder="Search for products"
            type="search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {searchQuery && (
          <div className="absolute inset-x-0 top-full mt-1 bg-white shadow-lg rounded-lg z-50">
            <ul className="max-w-lg mx-auto space-y-4 py-4 px-3 max-h-[70vh] overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li key={product.id} className="flex items-center gap-4">
                    <Image
                      width={20}
                      height={20}
                      src={product.images?.[0]?.url}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                    <Link
                      href={`/products/${product._id}`}
                      className="text-base font-medium text-gray-900 hover:text-main-500 line-clamp-2"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No products found.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
