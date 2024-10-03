"use client";
import { fetchAllCategories } from "@/app/redux/Features/category/categoryAction";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoriesSection = () => {
  const dispatch = useDispatch();
  const { allCategories, isLoading: isCategoriesLoading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <section className="main-container pt-12 pb-4">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="section-heading">Shop by Category</h2>
        <button className="hidden sm:block py-2.5 px-5 text-sm font-medium text-main-600 bg-white border border-main-500 rounded-lg hover:bg-main-50 hover:text-white transition-colors hover:bg-main-500">
          <Link href="/categories">See all categories</Link>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCategories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
          >
            <div className="text-main-500 mb-4">
              <Image
                height={20}
                width={20}
                src={category.image?.[0]?.url}
                alt={category.name}
                className="h-12 w-12"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center  sm:hidden">
        <button className="py-2.5 px-5 text-sm font-medium text-main-600 bg-white border border-main-500 rounded-lg hover:bg-main-50 hover:text-white transition-colors hover:bg-main-500">
          See all categories
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
