"use client";
import React from "react";
import {
  FaLaptop,
  FaMobileAlt,
  FaTshirt,
  FaCouch,
  FaAppleAlt,
  FaBook,
  FaGamepad,
  FaHeadphones,
} from "react-icons/fa";

const categories = [
  { name: "Laptops", icon: FaLaptop },
  { name: "Mobiles", icon: FaMobileAlt },
  { name: "Clothing", icon: FaTshirt },
  { name: "Furniture", icon: FaCouch },
  { name: "Groceries", icon: FaAppleAlt },
  { name: "Books", icon: FaBook },
  { name: "Gaming", icon: FaGamepad },
  { name: "Headphones", icon: FaHeadphones },
];

const CategoriesSection = () => {
  return (
    <section className="main-container py-12 bg-gray-50">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
        <button className="hidden sm:block py-2.5 px-5 text-sm font-medium text-primary-600 bg-white border border-primary-500 rounded-lg hover:bg-primary-50 hover:text-white transition-colors hover:bg-primary-500">
          See all categories
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
          >
            <div className="text-primary-500 mb-4">
              <category.icon className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center  sm:hidden">
        <button className="py-2.5 px-5 text-sm font-medium text-primary-600 bg-white border border-primary-500 rounded-lg hover:bg-primary-50 hover:text-white transition-colors hover:bg-primary-500">
          See all categories
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
