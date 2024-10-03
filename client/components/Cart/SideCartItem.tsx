import Image from 'next/image';
import React from 'react'

const SideCartItem = () => {
  return (
    <div>
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
            <p className="mt-1 text-sm text-gray-500">Salmon</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Qty 1</p>

            <div className="flex">
              <button 
                type="button" 
                className="font-medium text-red-600 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideCartItem;
