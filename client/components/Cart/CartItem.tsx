import Image from "next/image";
import React from "react";

const CartItem: React.FC<{
  item: any;
  onQuantityChange: (id: string, increment: boolean) => void;
}> = ({ item, onQuantityChange }) => {
  return (
    <div>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <Image
            width={20}
            height={20}
            className="h-20 w-20"
            src={item.images[0]?.url}
            alt={item.name}
          />

          <label htmlFor="counter-input" className="sr-only">
            Choose quantity:
          </label>
          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center">
              <button
                type="button"
                id="decrement-button"
                className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                onClick={() => onQuantityChange(item.id, false)}
              >
                -
              </button>
              <input
                type="text"
                id="counter-input"
                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none dark:text-white"
                value={item.quantity}
                readOnly
              />
              <button
                type="button"
                id="increment-button"
                className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                onClick={() => onQuantityChange(item.id, true)}
              >
                +
              </button>
            </div>
          </div>

          <div className="md:space-y-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white md:text-base">
              {item.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ${item.discountPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
