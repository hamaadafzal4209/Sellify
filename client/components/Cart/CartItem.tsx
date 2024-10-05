"use client"

import { CircleX, Cross } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CartItem = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
    const [quantity, setQuantity] = useState(1);
  
    const increment = () => {
      if (data.stock <= quantity) {
        toast.error("Product stock limited!");
      } else {
        setQuantity(quantity + 1);
        const updateCartData = { ...data, qty: quantity + 1 };
        quantityChangeHandler(updateCartData);
      }
    };
  
    const decrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        const updateCartData = { ...data, qty: quantity - 1 };
        quantityChangeHandler(updateCartData);
      }
    };
    
  return (
    <div>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <Image
            width={20}
            height={20}
            className="h-24 w-24 object-contain"
            src={data.images[0]?.url}
            alt={data.name}
          />

          <label htmlFor="counter-input" className="sr-only">
            Choose quantity:
          </label>
          <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              onClick={decrement}
              className="px-3 py-1 rounded-md text-gray-500 border border-gray-300 hover:bg-gray-200"
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={increment}
              className="px-3 py-1 rounded-md text-gray-500 border border-gray-300 hover:bg-gray-200"
            >
              +
            </button>
          </div>
          </div>

          <div className="md:space-y-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white md:text-base">
              {data.name}
            </p>
          <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
              ${data.discountPrice.toFixed(2)}
            </p>
            <div
            onClick={() => removeFromCartHandler(data)}
            className="text-red-500 hover:text-red-600 flex items-center gap-2 text-sm"
          >
            <CircleX /> <span>remove</span>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
