import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const SideCartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1); // Get quantity from the item

  const increaseQty = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  return (
    <div className="flex">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          width={20}
          height={20}
          src={item.images?.[0]?.url || '/assets/image.jpg'}
          alt={item.name}
          className="h-full w-full object-contain object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/products/${item._id}`} className='line-clamp-2'>{item.name}</Link>
            </h3>
            <p className="ml-4">${item.discountPrice?.toFixed(2)}</p>
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
              <Trash2/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartItem;