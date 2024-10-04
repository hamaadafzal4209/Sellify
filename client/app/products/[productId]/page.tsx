"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/app/redux/Features/product/productAction";
import { useSearchParams } from "next/navigation";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);
  const searchParams = useSearchParams();

  console.log("ProductDetails component rendered");

  // Get productId from search params, handle null case
  const productId = searchParams ? searchParams.get("productId") : null;
  console.log("Product ID:", productId);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        if (!allProducts.length) {
          await dispatch(getAllProducts());
          console.log("Products fetched:", allProducts);
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
    console.log("Updated Products:", allProducts);
  }, [allProducts]);
  
  // Set loading state based on product availability
  useEffect(() => {
    if (product) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [product]);
  

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId: product?._id,
      name: product?.name,
      quantity: quantity,
    });
  };

  const handleImageChange = (index) => {
    setMainImageIndex(index);
  };

  if (!product) {
    return <div>Product not found.</div>;
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
          />
          <div className="flex gap-2 mx-6 no-scrollbar mt-4 max-w-md overflow-x-auto">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md overflow-hidden flex-shrink-0 px-1 ${
                  index === mainImageIndex ? "border-2 border-main-500" : "border border-black"
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
                      i < Math.floor(product.ratings) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
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
            <Button className="flex-1 bg-main-500 hover:bg-main-600 text-white" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1">
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-12" />
    </div>
  );
}