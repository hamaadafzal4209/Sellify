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
import ProductDetailPopup from "./ProductDetailsPopup";

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false); // State to track modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product data

  if (!product) {
    return null;
  }

  const handleFavoriteToggle = () => {
    setIsFavorited((prev) => !prev);
  };

  // Open the quick view modal with the selected product data
  const handleQuickView = () => {
    setSelectedProduct(product); // Set the selected product
    setIsQuickViewOpen(true); // Open the modal
  };

  // Dynamic star rating rendering
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <AiFillStar key={index} className="h-4 w-4 text-yellow-400" />
        ))}
        {halfStar && <AiOutlineStar className="h-4 w-4 text-yellow-400" />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <AiOutlineStar
            key={index + fullStars}
            className="h-4 w-4 text-yellow-400"
          />
        ))}
      </>
    );
  };

  return (
    <div className="relative max-w-80 w-full rounded-lg border border-gray-100 bg-white p-4 shadow hover:shadow-lg transition-shadow duration-300">
      <div className="h-56 w-full relative">
        <Link href={`/products/${product._id}`}>
          <Image
            width={1000}
            height={1000}
            className="h-full w-full p-2 rounded-lg object-contain shadow"
            src={product.images?.[0]?.url}
            alt={product.name}
          />
        </Link>
      </div>

      <div className="pt-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-600">
              In Stock
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tooltip-id="tooltip-quick-view"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              onClick={handleQuickView} // Open the quick view modal
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
              content={
                isFavorited ? "Remove from Favorites" : "Add to Favorites"
              }
            />
          </div>
        </div>

        <Link
          href={`/products/${product._id}`}
          className="block text-lg font-semibold leading-tight text-gray-900 hover:underline"
        >
          <p className="line-clamp-2">{product.name}</p>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center">
            {renderStars(product.ratings)}
          </div>
          <p className="text-sm font-medium text-gray-900">{product.ratings}</p>
          <p className="text-sm font-medium text-gray-500">
            ({product.reviews?.length})
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center mt-4 rounded-lg bg-main-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-main-600"
        >
          <FaShoppingCart className="mr-2 h-5 w-5" />
          Add to cart
        </button>
      </div>

      {/* Product Quick View Popup */}
      {selectedProduct && (
        <ProductDetailPopup
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductCard;
