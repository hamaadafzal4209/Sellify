"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/app/redux/Features/product/productAction";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        if (!allProducts.length) {
          await dispatch(getAllProducts());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [dispatch, allProducts.length]);

  useEffect(() => {
    if (!isLoading && allProducts.length && productId) {
      const foundProduct = allProducts.find((item) => item._id === productId);
      setProduct(foundProduct || null);
    }
  }, [isLoading, allProducts, productId]);

  const handleAddToCart = () => {
    if (product) {
      console.log("Added to cart:", {
        productId: product._id,
        name: product.name,
        quantity: quantity,
      });
    }
  };

  const handleImageChange = (index) => {
    setMainImageIndex(index);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div>
        <h1>Product not found.</h1>
        <p>
          It seems like the product you're looking for does not exist or could
          not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="main-container py-8 px-4 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="relative flex flex-col items-center">
          <Image
            width={1000}
            height={1000}
            src={product.images?.[mainImageIndex]?.url}
            alt={product.name}
            className="w-full h-96 object-contain bg-gray-100 p-4 rounded-lg"
          />
          <div className="flex gap-2 mt-4 overflow-x-auto max-w-md">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden flex-shrink-0 px-1 ${
                  index === mainImageIndex
                    ? "border-2 border-main-500"
                    : "border border-gray-300"
                }`}
                onClick={() => handleImageChange(index)}
              >
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className="object-contain w-16 h-16"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>

            {/* Description with Show More / Less */}
            <p className="text-gray-500 mt-2">
              {isDescriptionExpanded
                ? product.description
                : product.description.slice(0, 100) + "..."}
              <button
                onClick={toggleDescription}
                className="text-main-500 ml-2 font-semibold"
              >
                {isDescriptionExpanded ? "Show Less" : "Show More"}
              </button>
            </p>

            {/* Pricing Section */}
            <div className="mt-4 flex items-center space-x-4">
              <span className="text-3xl font-bold text-main-500">
                ${product.discountPrice}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
              {product.discountPrice && (
                <Badge className="ml-2 text-sm bg-gray-200 text-black">
                  Save ${product.originalPrice - product.discountPrice}
                </Badge>
              )}
            </div>

            {/* Ratings Section */}
            <div className="mt-4 flex items-center space-x-4">
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

          <div className="flex space-x-4 mt-6">
            <Button
              className="flex-1 bg-main-500 hover:bg-main-600 text-white"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1">
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for Product Details, Features, and Reviews */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Product Features */}
          <TabsContent value="features" className="mt-6">
            <h3 className="text-lg font-semibold">Product Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              )) || "No features available."}
            </ul>
          </TabsContent>

          {/* Customer Reviews */}
          <TabsContent value="reviews" className="mt-6">
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            {product.reviews?.length ? (
              <div className="space-y-4 mt-4">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <p className="text-gray-800">{review.comment}</p>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(review.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mt-2">No reviews available.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
