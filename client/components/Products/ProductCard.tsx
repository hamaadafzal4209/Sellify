"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineStar, AiFillHeart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Validate product data before proceeding
  if (!product) {
    return null; // Or a loading state
  }

  // Sample conditions for stock, discount, and new status
  const isInStock = true; // You can customize this based on your data
  const hasDiscount = false; // You can customize this based on your data
  const isNew = true; // You can customize this based on your data

  // Function to toggle the favorite status
  const handleFavoriteToggle = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="relative rounded-lg border border-gray-100 bg-white p-4 shadow hover:shadow-lg transition-shadow duration-300">
      <div className="h-56 w-full relative">
        <Link href={`/product/${product.id}`}>
          <img
            className="h-full w-full rounded-lg object-contain shadow"
            src={product.image} // Using the product image from the API
            alt={product.title} // Using the product title for alt text
          />
        </Link>

        {/* New Tag */}
        {isNew && (
          <span className="absolute top-2 left-2 rounded-full bg-primary-500 px-2 py-1 text-xs font-semibold text-white">
            New
          </span>
        )}
      </div>

      <div className="pt-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Discount Condition */}
            {hasDiscount && (
              <span className="rounded bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-600">
                35% off
              </span>
            )}

            {/* Stock Condition */}
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold ${
                isInStock
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {isInStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tooltip-id="tooltip-quick-view"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <AiOutlineEye className="h-5 w-5" />
              <span className="sr-only">Quick view</span>
            </button>
            <Tooltip id="tooltip-quick-view" content="Quick View" />

            <button
              type="button"
              data-tooltip-id="tooltip-favorite"
              onClick={handleFavoriteToggle}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              {isFavorited ? (
                <AiFillHeart className="h-5 w-5 text-red-500" />
              ) : (
                <AiOutlineHeart className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
              </span>
            </button>
            <Tooltip
              id="tooltip-favorite"
              content={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            />
          </div>
        </div>

        <Link
          href={`/product/${product.id}`}
          className="block text-lg font-semibold leading-tight text-gray-900 hover:underline"
        >
          <p className="line-clamp-2">
          {product.title}
          </p>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center">
            <AiFillStar className="h-4 w-4 text-yellow-400" />
            <AiFillStar className="h-4 w-4 text-yellow-400" />
            <AiFillStar className="h-4 w-4 text-yellow-400" />
            <AiFillStar className="h-4 w-4 text-yellow-400" />
            <AiOutlineStar className="h-4 w-4 text-yellow-400" />
          </div>

          <p className="text-sm font-medium text-gray-900">5.0</p>
          <p className="text-sm font-medium text-gray-500">(455)</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xl font-extrabold text-primary-600">${product.price}</p>
            {/* Assuming no discounts from the API */}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center mt-4 rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300"
        >
          <FaShoppingCart className="mr-2 h-5 w-5" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;