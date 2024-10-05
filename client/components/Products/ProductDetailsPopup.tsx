"use client";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTocartAction,
  removeFromCartAction,
} from "@/app/redux/Features/cart/cartAction";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "@/app/redux/Features/wishlist/wishlistAction";

const ProductDetailPopup = ({ isOpen, onClose, product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { wishlist } = useSelector((state: any) => state.wishlist);
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the product is already in the wishlist
    const isProductInWishlist = wishlist.some(
      (item: any) => item._id === product._id
    );
    setIsWishlisted(isProductInWishlist);
  }, [wishlist, product]);

  if (!product) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] w-full h-[80vh] overflow-y-auto p-0">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="relative w-full md:w-1/2 flex flex-col items-center">
            <Image
              width={1000}
              height={1000}
              src={product.images?.[selectedImage]?.url}
              alt={product.name}
              className="w-full mt-8 max-w-sm p-6 object-contain"
            />

            <div className="flex gap-2 mx-6 no-scrollbar mt-4 max-w-md overflow-x-auto">
              {product.images?.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden flex-shrink-0 px-1 ${
                    index === selectedImage
                      ? "border-2 border-main-500"
                      : "border border-black "
                  }`}
                  onClick={() => setSelectedImage(index)}
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
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailPopup;
