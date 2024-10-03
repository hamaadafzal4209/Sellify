"use client";

import { useState } from "react";
import { Star, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ProductDetailPopup() {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Product Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] w-full h-[80vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-square flex items-center justify-center">
            <Image
              width={1000}
              height={1000}
              src={"/assets/apple-watch-1.jpg"}
              alt="Product Image"
              className="w-full max-w-sm p-6 object-contain"
            />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Premium Wireless Headphones
              </h2>
              <p className="text-gray-600 mb-4">
                Experience crystal-clear audio with our premium wireless
                headphones. Featuring noise-cancellation technology and
                long-lasting battery life.
              </p>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-main-500 mr-2">
                  $129.99
                </span>
                <span className="text-xl text-gray-500 line-through">
                  $159.99
                </span>
                <Badge variant="secondary" className="ml-2">
                  Save $30
                </Badge>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.0 (250 reviews)</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="flex-1 bg-main-500 hover:bg-main-600 text-white">
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className={`flex-1 ${
                  isWishlisted ? "text-red-500" : "text-gray-700"
                }`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${
                    isWishlisted ? "fill-red-500" : ""
                  }`}
                />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
