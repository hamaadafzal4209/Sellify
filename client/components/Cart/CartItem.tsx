import React from 'react';

const CartItem: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <a href="#" className="shrink-0 md:order-1">
            <img
              className="h-20 w-20"
              src={item.image} // assuming 'image' is a key in the item object
              alt={item.name} // assuming 'name' is a key in the item object
            />
          </a>

          <label htmlFor="counter-input" className="sr-only">
            Choose quantity:
          </label>
          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center">
              <button
                type="button"
                id="decrement-button"
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                -
              </button>
              <input
                type="text"
                id="counter-input"
                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                value={item.quantity}
                readOnly
              />
              <button
                type="button"
                id="increment-button"
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
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
              ${item.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;