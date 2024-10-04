"use client"

import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img className="h-20 w-20" src={item.image} alt={item.name} /> {/* Assuming item has image and name properties */}
        </a>

        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button type="button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
              {/* Decrement button */}
            </button>
            <input type="text" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" value={item.quantity} required /> {/* Assuming item has quantity */}
            <button type="button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
              {/* Increment button */}
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">${item.price.toFixed(2)}</p> {/* Assuming item has price */}
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
            {item.name} {/* Assuming item has name */}
          </a>

          <div className="flex items-center gap-4">
            <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
              {/* Add to Favorites button */}
            </button>

            <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
              {/* Remove button */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;