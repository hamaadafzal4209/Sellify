import Image from 'next/image';
import React, { useState } from 'react';

const SideCartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  return (
    <div className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          width={20}
          height={20}
          src={'/assets/image.jpg'}
          alt="image"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">Throwback Hip Bag</a>
            </h3>
            <p className="ml-4">$90.00</p>
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center">
            <button
              onClick={decreaseQty}
              className="px-3 py-1 rounded-md text-gray-500 border border-gray-300 hover:bg-gray-200"
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={increaseQty}
              className="px-3 py-1 rounded-md text-gray-500 border border-gray-300 hover:bg-gray-200"
            >
              +
            </button>
          </div>

          <div className="flex">
            <button type="button" className="font-medium text-red-600 hover:text-red-500">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartItem;
