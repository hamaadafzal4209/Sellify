"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineStar,
  AiFillHeart,
} from "react-icons/ai";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import ProductDetailPopup from "./ProductDetailsPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  addTocartAction,
  removeFromCartAction,
} from "@/app/redux/Features/cart/cartAction";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "@/app/redux/Features/wishlist/wishlistAction";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    images: { url: string }[];
    ratings: number;
    reviews: { length: number }[];
    stock: number;
    discountPrice: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart = [] } = useSelector((state: any) => state.cart);
  const { wishlist = [] } = useSelector((state: any) => state.wishlist);

  const [isFavorited, setIsFavorited] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();

  // Check if product is in cart
  useEffect(() => {
    if (cart) {
      const isItemInCart = cart.some((item: any) => item._id === product._id);
      setInCart(isItemInCart);
    }
  }, [cart, product._id]);

  // Check if product is in wishlist
  useEffect(() => {
    if (wishlist) {
      const isItemInWishlist = wishlist.some(
        (item: any) => item._id === product._id
      );
      setIsFavorited(isItemInWishlist);
    }
  }, [wishlist, product._id]);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFromWishlistHandler(product._id);
    } else {
      addToWishlistHandler(product);
    }
  };

  const handleQuickView = () => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const renderStars = (rating: number) => {
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

  const removeFromWishlistHandler = (productId) => {
    setIsFavorited(false);
    dispatch(removeFromWishlistAction(productId));
  };

  const addToWishlistHandler = (product) => {
    setIsFavorited(true);
    dispatch(addToWishlistAction(product));
  };

  const handleAddToCart = () => {
    dispatch(addTocartAction(product));
    setInCart(true);

    // Save to local storage
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    localStorage.setItem(
      "cartProducts",
      JSON.stringify([...cartProducts, product])
    );
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCartAction(product._id));
    setInCart(false);
  };

  return (
    <div className="relative md:max-w-80 w-full rounded-lg border border-gray-100 bg-white p-4 shadow hover:shadow-lg transition-shadow duration-300">
      <div className="h-56 w-full relative">
        <Link href={`/products/${product._id}`}>
          <Image
            width={1000}
            height={1000}
            className="h-full w-full p-2 rounded-lg object-contain shadow"
            src={product.images?.[0]?.url || "/assets/image.jpg"}
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
              onClick={handleQuickView}
            >
              <AiOutlineEye className="h-5 w-5" />
              <span className="sr-only">Quick view</span>
            </button>
            <Tooltip id="tooltip-quick-view" content="Quick View" />

            <button
              type="button"
              data-tooltip-id={
                isFavorited ? "tooltip-remove-favorite" : "tooltip-add-favorite"
              } // Assign different tooltip IDs
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
              id="tooltip-remove-favorite"
              content="Remove from Favorites"
            />
            <Tooltip id="tooltip-add-favorite" content="Add to Favorites" />
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
          className={`inline-flex w-full items-center justify-center mt-4 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-300 bg-main-500 text-white hover:bg-main-600`}
          onClick={inCart ? handleRemoveFromCart : handleAddToCart}
        >
          {inCart ? (
            <>
              <FaShoppingCart className="mr-2 h-5 w-5" />
              Remove from Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>

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
