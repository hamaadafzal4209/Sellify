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
import RelatedProducts from "@/components/Products/RelatedProducts";
import {
  addTocartAction,
  removeFromCartAction,
} from "@/app/redux/Features/cart/cartAction";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "@/app/redux/Features/wishlist/wishlistAction";

export default function ProductDetails() {
  const { allProducts } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state: any) => state.wishlist);
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    if (product) {
      const isProductInWishlist = wishlist.some(
        (item: any) => item._id === product._id
      );
      setIsWishlisted(isProductInWishlist);
    }
  }, [wishlist, product]);

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

  const relatedProducts = product
    ? allProducts.filter(
        (item) => item.category === product.category && item._id !== product._id
      )
    : [];

  useEffect(() => {
    console.log("Product:", product);
    console.log("All Products:", allProducts);
  }, [product, allProducts]);

  const handleAddToCart = () => {
    const isInCart = cart.some((item: any) => item._id === product._id);
    if (isInCart) {
      dispatch(removeFromCartAction(product._id));
    } else {
      dispatch(addTocartAction(product));
    }
  };

  const handleAddToWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlistAction(product._id));
    } else {
      dispatch(addToWishlistAction(product));
    }
    setIsWishlisted(!isWishlisted);
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

  // Dummy reviews data
  const dummyReviews = [
    {
      name: "John Doe",
      comment: "Absolutely loved this product! It exceeded my expectations.",
      rating: 5,
    },
    {
      name: "Jane Smith",
      comment:
        "The quality is fantastic, but it took longer to arrive than expected.",
      rating: 4,
    },
    {
      name: "Michael Johnson",
      comment: "Good value for money. Would recommend to others!",
      rating: 4,
    },
    {
      name: "Emily Davis",
      comment: "Not what I expected. It looks different from the pictures.",
      rating: 3,
    },
    {
      name: "Chris Lee",
      comment: "Fantastic product! I will definitely buy again.",
      rating: 5,
    },
  ];

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
            className="max-w-sm w-full h-96 object-contain bg-gray-100 p-4 rounded-lg"
          />
          <div className="flex gap-2 mt-4 overflow-x-auto max-w-md no-scrollbar">
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
                <Badge className="ml-2 text-sm bg-gray-200 hover:bg-gray-200 text-black">
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
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                className="flex-1 bg-main-500 hover:bg-main-600 text-white"
                onClick={handleAddToCart}
              >
                {cart.some((item: any) => item._id === product._id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                className={`flex-1 ${
                  isWishlisted ? "text-red-500" : "text-gray-700"
                }`}
                onClick={handleAddToWishlist}
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
      </div>

      {/* Tabs for Product Features and Reviews */}
      <div className="mt-12">
        <Tabs defaultValue="features">
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
            {dummyReviews.length ? (
              <div className="space-y-4 mt-4">
                {dummyReviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold">Related Products</h3>
          <RelatedProducts relatedProducts={relatedProducts} />
        </div>
      )}
    </div>
  );
}
