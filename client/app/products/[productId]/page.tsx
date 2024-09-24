"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/Products/ProductCard";
import { StarFilledIcon } from "@radix-ui/react-icons";

// Mock data for the product
const product = {
  id: 1,
  name: "Classic Leather Jacket",
  price: 299.99,
  description:
    "The Classic Leather Jacket offers a timeless design, crafted from premium full-grain leather. Featuring a modern fit with robust durability, it's an essential piece for any wardrobe. This jacket is fully lined, with two interior pockets, and a comfortable fit that works for any occasion, whether formal or casual.",
  images: [
    "/assets/apple-logo.jpg",
    "/assets/apple-watch-1.jpg",
    "/assets/apple-watch-2.jpg",
    "/assets/apple-watch-3.jpg",
  ],
  reviews: [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      comment:
        "Excellent quality and fit! The leather feels premium, and it's perfect for both casual and formal occasions.",
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      comment:
        "Great jacket, but runs a bit small. I would recommend ordering one size up.",
    },
    {
      id: 3,
      author: "Mike R.",
      rating: 5,
      comment:
        "Exactly what I was looking for. The jacket looks and feels amazing, definitely worth the price.",
    },
  ],
  relatedProducts: [
    {
      id: 2,
      name: "Vintage Denim Jacket",
      price: 199.99,
      image: "/assets/denim-jacket.jpg",
    },
    {
      id: 3,
      name: "Modern Wool Coat",
      price: 349.99,
      image: "/assets/wool-coat.jpg",
    },
    {
      id: 4,
      name: "Leather Gloves",
      price: 59.99,
      image: "/assets/leather-gloves.jpg",
    },
  ],
};

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId: product.id,
      name: product.name,
      quantity: quantity,
    });
  };

  const handleImageChange = (index) => {
    setMainImageIndex(index);
  };

  return (
    <div className="main-container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image Section */}
        <div className="space-y-4">
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              <CarouselItem>
                <Image
                  src={product.images[mainImageIndex]}
                  alt={`${product.name} - Image`}
                  width={600}
                  height={600}
                  className="rounded-lg h-[400px] w-[400px] object-contain"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex justify-center space-x-2">
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${product.name} - Thumbnail ${index + 1}`}
                width={60}
                height={60}
                className="rounded-md w-24 h-24 object-cover cursor-pointer"
                onClick={() => handleImageChange(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex gap-2">
              <p className="text-2xl font-semibold text-primary-500">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-base text-gray-600 line-through">250.00$</p>
            </div>
            <div className="flex items-center">
              <StarFilledIcon className="h-5 w-5 text-yellow-400" />
              <StarFilledIcon className="h-5 w-5 text-yellow-400" />
              <StarFilledIcon className="h-5 w-5 text-yellow-400" />
              <StarFilledIcon className="h-5 w-5 text-yellow-400" />
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-2">{product.reviews.length} Reviews</span>
            </div>
          </div>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex space-x-2">
            <Button
              className="bg-primary-500 text-white hover:bg-primary-600"
              size="lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              className="border border-gray-300 bg-white hover:bg-gray-100"
              size="lg"
            >
              <Heart className="mr-2" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Product Tabs: Description and Reviews */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
          <p className="text-gray-600">
            {product.description}
            This jacket is crafted with a tailored fit to ensure comfort and
            style. The high-quality leather is designed to last and only gets
            better with age.
          </p>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{review.author}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <div className="card-container grid grid-cols-2 gap-6 md:grid-cols-3">
          {product.relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
