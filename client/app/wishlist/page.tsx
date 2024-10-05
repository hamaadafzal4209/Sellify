"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlistAction } from "@/app/redux/Features/wishlist/wishlistAction";
import WishlistItem from "@/components/WishList/WIshlistItem";

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

  const addToCart = (id: string) => {
    const product = wishlist.find((item) => item._id === id);
    if (product) {
      dispatch(addToCartAction(product));
    }
  };

  return (
    <div className="main-container px-4 py-8 max-w-6xl">
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

          <div className="card-container gap-6">
            {wishlist.map((item) => (
              <WishlistItem key={item._id} item={item} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
