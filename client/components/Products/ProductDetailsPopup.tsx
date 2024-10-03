"use client";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { useState } from "react";

const ProductDetailPopup = ({ isOpen, onClose, product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] w-full h-[80vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-square flex items-center justify-center">
            <Image
              width={1000}
              height={1000}
              src={product.images?.[0]?.url}
              alt={product.name}
              className="w-full max-w-sm p-6 object-contain"
            />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-main-500 mr-2">
                  ${product.discountPrice}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                {product.discountPrice && (
                  <Badge variant="secondary" className="ml-2">
                    Save ${product.originalPrice - product.discountPrice}
                  </Badge>
                )}
              </div>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.ratings)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.ratings} ({product.reviews?.length} reviews)
                </span>
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
};

export default ProductDetailPopup;
