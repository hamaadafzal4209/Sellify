"use client";
import { Trash2, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlistAction } from "@/app/redux/Features/wishlist/wishlistAction";
import {
  addTocartAction,
  removeFromCartAction,
} from "@/app/redux/Features/cart/cartAction";
import { useState, useEffect } from "react";
import Link from "next/link";

interface WishlistItemProps {
  item: {
    _id: string;
    name: string;
    price: number;
    discountPrice: number;
    images: { url: string }[];
    inStock: boolean;
  };
}

export default function WishlistItem({ item }: WishlistItemProps) {
  const dispatch = useDispatch();
  const { cart = [] } = useSelector((state: any) => state.cart);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (cart) {
      const isItemInCart = cart.some(
        (cartItem: any) => cartItem._id === item._id
      );
      setInCart(isItemInCart);
    }
  }, [cart, item._id]);

  const removeFromWishlist = (id: string) => {
    dispatch(removeFromWishlistAction(id));
  };

  const addToCart = () => {
    dispatch(addTocartAction(item));
    setInCart(true);
  };

  const removeFromCart = () => {
    dispatch(removeFromCartAction(item._id));
    setInCart(false);
  };

  return (
    <Card key={item._id} className="sm:max-w-80 w-full overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/products/${item._id}`}>
          <Image
            width={1000}
            height={1000}
            src={item.images[0]?.url}
            alt={item.name}
            className="w-full h-48 object-contain p-4 pb-0"
          />
        </Link>
        <div className="p-4">
          <h2 className="text-lg line-clamp-3 font-semibold mb-2 text-gray-800">
            {item.name}
          </h2>
          <p className="text-gray-600">${item?.discountPrice.toFixed(2)}</p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromWishlist(item._id)}
          className="border-2"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove from wishlist</span>
        </Button>

        <Button
          onClick={inCart ? removeFromCart : addToCart}
          className={`flex items-center ${
            inCart
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-main-500 text-white hover:bg-main-600"
          }`}
        >
          {inCart ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
