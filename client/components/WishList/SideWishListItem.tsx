import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const SideWishListItem = ({ data, removeFromWishListHandler }) => {
  return (
    <div className="flex w-full gap-4 border-b pb-4">
      <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
        <Image
          width={1000}
          height={1000}
          src={data.images?.[0]?.url || "/assets/image.jpg"}
          alt={data.name}
          className="h-full w-full object-contain object-center"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="min-w-0">
              <Link
                href={`/products/${data._id}`}
                className="line-clamp-2 text-wrap truncate"
              >
                {data.name}
              </Link>
            </h3>
            <p className="ml-4">${data.discountPrice?.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <Button
            onClick={() => removeFromWishListHandler(data)}
            className="text-gray-500 bg-transparent hover:bg-transparent hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideWishListItem;
