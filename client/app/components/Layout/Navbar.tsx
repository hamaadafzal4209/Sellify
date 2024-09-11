"use client"
import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { logoutUser } from "@/app/redux/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BiSearch, BiChevronDown } from "react-icons/bi";
import { Dropdown, Avatar } from "flowbite-react";

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cartCount = 3
  const wishlistCount = 5;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser() as any); // Cast to `any` if necessary
  };

  useEffect(() => {
    // Handle side effects if necessary
  }, [user]);

  return (
    <div className="shadow-md w-full px-5 py-4 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <h2 className="text-2xl font-bold text-primary">
            <Link href="/">
              <Image width={120} height={100} className="mx-auto" src="/logo.png" alt="Sellify" />
            </Link>
          </h2>
        </div>

        {/* Search Box */}
        <div className="hidden md:flex items-center flex-grow max-w-[600px] relative">
          <form className="w-full flex items-center">
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            >
              All categories
              <BiChevronDown className="ml-2.5" size={20} />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-0 max-h-96 overflow-y-auto mt-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Mockups
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Templates
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Design
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Logos
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <input
              type="search"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary"
              placeholder="Search Mockups, Logos, Design Templates..."
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-lg border border-primary hover:bg-darkPrimary focus:ring-4 focus:outline-none"
            >
              <BiSearch size={20} />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <AiOutlineHeart className="text-2xl text-black cursor-pointer hover:text-primary transition-colors duration-200" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                {wishlistCount}
              </span>
            )}
          </div>

          <div className="relative">
            <AiOutlineShoppingCart className="text-2xl text-black cursor-pointer hover:text-primary transition-colors duration-200" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {user ? (
            <div className="relative">
              <Dropdown
                label={
                  <Avatar
                    alt="User settings"
                    img={user.profilePicture || "/user.png"}
                    rounded
                  />
                }
                arrowIcon={false}
                inline
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user.name}</span>
                  <span className="block truncate text-sm font-medium">{user.email}</span>
                </Dropdown.Header>
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <Link href="/login">
              <AiOutlineUser className="text-2xl text-black cursor-pointer hover:text-primary transition-colors duration-200" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search Box */}
      <div className="flex md:hidden mt-2 items-center flex-grow relative">
        <form className="w-full flex items-center">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          >
            All
            <BiChevronDown className="ml-1.5" size={20} />
          </button>
          {dropdownOpen && (
            <div className="max-h-96 overflow-y-auto absolute left-0 top-0 mt-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Mockups
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Templates
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Design
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Logos
                  </button>
                </li>
              </ul>
            </div>
          )}
          <input
            type="search"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary"
            placeholder="Search Mockups, Logos, Design Templates..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-lg border border-primary hover:bg-darkPrimary focus:ring-4 focus:outline-none"
          >
            <BiSearch size={20} />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;