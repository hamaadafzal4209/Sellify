"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Minus, Plus, Star, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/Products/ProductCard"

// Mock data for the product
const product = {
  id: 1,
  name: "Classic Leather Jacket",
  price: 299.99,
  description: "A timeless leather jacket that never goes out of style. Made from premium leather with a comfortable fit and durable construction.",
  images: [
    "/assets/apple-logo.jpg",
    "/assets/apple-watch-1.jpg",
    "/assets/apple-watch-2.jpg",
    "/assets/apple-watch-3.jpg",
  ],
  reviews: [
    { id: 1, author: "John D.", rating: 5, comment: "Excellent quality and fit!" },
    { id: 2, author: "Sarah M.", rating: 4, comment: "Great jacket, but runs a bit small." },
    { id: 3, author: "Mike R.", rating: 5, comment: "Exactly what I was looking for." },
  ],
}

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1)
  const [mainImageIndex, setMainImageIndex] = useState(0)

  const handleAddToCart = () => {
    // Implement add to cart logic here
    console.log("Added to cart:", {
      productId: product.id,
      name: product.name,
      quantity: quantity,
    })
  }

  const handleImageChange = (index) => {
    setMainImageIndex(index)
  }

  return (
    <div className="main-container py-8">
      <div className="grid gap-8 md:grid-cols-2">
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
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1">{product.reviews.length} Reviews</span>
            </div>
          </div>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex space-x-2">
            <Button className="bg-primary-500 text-white hover:bg-primary-600" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button className="border border-gray-300 hover:bg-gray-100" size="lg">
              <Heart className="mr-2" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-12" />
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="description" className="bg-white">Description</TabsTrigger>
          <TabsTrigger value="reviews" className="bg-white">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
          <p className="text-gray-600">
            {product.description}
            {/* Add more detailed description here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                        className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
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
      <div>
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <div className="card-container gap-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  )
}