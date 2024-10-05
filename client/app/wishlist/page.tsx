"use client";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlistAction,
  addToCartAction,
} from "@/app/redux/Features/wishlist/wishlistAction";

export default function WishlistPage() {
  const { wishlist = [] } = useSelector((state: any) => state.wishlist);
  const dispatch = useDispatch();

  const totalItems = wishlist.length;
  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);

  const clearAllWishlist = () => {
    wishlist.forEach((item) => {
      dispatch(removeFromWishlistAction(item._id));
    });
  };

  const removeFromWishlist = (id) => {
    dispatch(removeFromWishlistAction(id));
  };

  const addToCart = (id) => {
    const product = wishlist.find((item) => item._id === id);
    if (product) {
      dispatch(addToCartAction(product));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        {wishlist.length > 0 && (
          <Button variant="outline" onClick={clearAllWishlist}>
            Clear All
          </Button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Your wishlist is empty.</p>
            <Button className="mt-4" variant="outline">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Wishlist Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Value:</span>
                <span>${totalValue.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <Card key={item._id} className="wishlist-item overflow-hidden">
                <CardContent className="p-0">
                  <div>
                    <image
                      width={20}
                      height={20}
                      src={item.images?.[0]?.url}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      ${item?.discountPrice.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-between p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromWishlist(item._id)}
                    className="wishlist-item__remove"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                  <Button
                    onClick={() => addToCart(item._id)}
                    disabled={!item.inStock}
                    className="wishlist-item__cart"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
