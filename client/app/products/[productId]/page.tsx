"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/app/redux/Features/product/productAction";
import { useRouter } from "next/navigation";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);
  const router = useRouter();

  // Ensure that the query is defined before destructuring
  const productId = router.query?.productId;

  // Find the product by ID from the allProducts state
  const product = allProducts.find((prod) => prod._id === productId);

  useEffect(() => {
    // Fetch all products if they haven't been fetched yet
    if (!allProducts.length) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts.length]);

  const handleAddToCart = () => {
    try {
      console.log("Added to cart:", {
        productId: product.id,
        name: product.name,
        quantity: quantity,
      });
      // Add logic to update the cart state
    } catch (err) {
      setError("Failed to add to cart");
    }
  };

  const handleImageChange = (index: number) => {
    setMainImageIndex(index);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Handle loading state
  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="main-container py-8">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="relative w-full md:w-1/2 flex flex-col items-center">
          <Image
            width={1000}
            height={1000}
            src={product.images?.[mainImageIndex]?.url}
            alt={product.name}
            className="w-full mt-8 max-w-sm p-6 object-contain"
            onLoad={handleImageLoad}
          />
          <div className="flex gap-2 mx-6 no-scrollbar mt-4 max-w-md overflow-x-auto">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden flex-shrink-0 px-1 ${
                  index === mainImageIndex
                    ? "border-2 border-main-500"
                    : "border border-black"
                }`}
                onClick={() => handleImageChange(index)}
              >
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className="object-contain w-20 h-20 flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
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
            <div className="flex items-center space-x-4">
              <div className="flex">
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
              <span className="text-sm text-gray-600">
                {product.sold_out} (Sold)
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              className="flex-1 bg-main-500 hover:bg-main-600 text-white"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className={`flex-1 ${
                isWishlisted ? "text-red-500" : "text-gray-700"
              }`}
            >
              <Heart
                className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-red-500" : ""}`}
              />
              {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Product Tabs: Description and Reviews */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="bg-gray-100">
          <TabsTrigger
            value="description"
            className={({ active }) =>
              `px-4 py-2 font-semibold transition-colors ${
                active ? "bg-main-500 text-white" : "text-gray-600"
              }`
            }
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className={({ active }) =>
              `px-4 py-2 font-semibold transition-colors ${
                active ? "bg-main-500 text-white" : "text-gray-600"
              }`
            }
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
          <p className="text-gray-600">{product.description}</p>
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
        <div className="card-container">
          {product.relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
