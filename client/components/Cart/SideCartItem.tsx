import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const SideCartItem = ({  data, quantityChangeHandler, removeFromCartHandler  }) => {
    const [value, setValue] = useState(data.qty);
    const totalPrice = data.discountPrice * value;

    const increment = () => {
        if (data.stock <= value) {
          toast.error("Product stock limited!");
        } else {
          setValue(value + 1);
          const updateCartData = { ...data, qty: value + 1 };
          quantityChangeHandler(updateCartData);
        }
      };
    
      const decrement = () => {
        if (value > 1) {
          setValue(value - 1);
          const updateCartData = { ...data, qty: value - 1 };
          quantityChangeHandler(updateCartData);
        }
      };

  return (
    <div className="flex w-full gap-2">
      <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
        <Image
          width={20}
          height={20}
          src={data.images?.[0]?.url || "/assets/image.jpg"}
          alt={data.name}
          className="h-full w-full object-contain object-center"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/products/${data._id}`} className="line-clamp-2 text-wrap">
                {data.name}
              </Link>
            </h3>
            <p className="ml-4">${data.discountPrice?.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <button
              onClick={decrement}
              className="px-3 py-1 rounded-md text-gray-500 border border-gray-300 hover:bg-gray-200"
              disabled={value === 1}
            >
              -
            </button>
            <span className="px-4">{value}</span>
            <button
            onClick={increment}
              className="px-3 py-1 rounded-md text-gray-500 border border-gray-300 hover:bg-gray-200"
            >
              +
            </button>
          </div>

          {/* Trash icon for removing the item */}
          <button onClick={() => removeFromCartHandler(data)} className="text-gray-500 hover:text-red-500">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideCartItem;