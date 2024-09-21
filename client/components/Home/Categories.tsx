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
    <section className="main-container py-12">
      <div className="flex items-center justify-between gap-4">
        <h2 className="mb-8 text-2xl font-extrabold text-gray-900 text-center">
          Shop by Category
        </h2>
        <button className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
          See all categories
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <div className="text-primary-500 mb-4">
              <category.icon className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
