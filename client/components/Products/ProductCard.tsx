"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineStar,
  AiFillHeart,
} from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const ProductCard = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Sample conditions for stock and discount
  const isInStock = true; // Modify this based on actual stock status
  const hasDiscount = true; // Modify this based on actual discount status

  // Function to toggle the favorite status
  const handleFavoriteToggle = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="h-56 w-full">
        <Link href="">
          <Image
            width={1000}
            height={1000}
            className="mx-auto h-full w-full rounded-lg object-cover"
            src="/assets/image.jpg"
            alt="Product"
          />
        </Link>
      </div>
      <div className="pt-3">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            {/* Discount Condition */}
            {hasDiscount && (
              <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-600">
                Up to 35% off
              </span>
            )}

            {/* Stock Condition */}
            {isInStock ? (
              <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                In Stock
              </span>
            ) : (
              <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              data-tooltip-id="tooltip-quick-view"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <AiOutlineEye className="h-5 w-5" />
              <span className="sr-only">Quick view</span>
            </button>
            <Tooltip id="tooltip-quick-view" content="Quick View" />

            {/* Favorite Button with Conditional Tooltip */}
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
              content={
                isFavorited ? "Remove from Favorites" : "Add to Favorites"
              }
            />
          </div>
        </div>

        <Link
          href=""
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
        >
          Apple iMac 27, 1TB HDD, Retina 5K Display, M3 Max
        </Link>

        <div className="mt-2 flex items-center gap-2">
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

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-xl font-extrabold text-primary-600">$1,499</p>
            <p className="text-sm line-through text-gray-500">$1,699</p>
          </div>

          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300"
          >
            <FaShoppingCart className="me-2 h-5 w-5" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
