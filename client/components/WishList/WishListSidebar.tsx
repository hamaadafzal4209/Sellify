import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Heart } from "lucide-react"; 
import SideWishListItem from "./SideWishListItem";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import {
  removeFromWishlistAction,
} from "@/app/redux/Features/wishlist/wishlistAction";

const WishListSidebar = () => {
  const { isAuthenticated } = useSelector((state : any) => state.user);
  const { wishlist = [] } = useSelector((state : any) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishListHandler = (data) => {
    dispatch(removeFromWishlistAction(data._id)); 
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Heart className="h-4 w-4" /> {/* Heart icon for wishlist */}
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-main-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {wishlist.length || 0} {/* Show wishlist count */}
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Wishlist</SheetTitle> {/* Change title to Wishlist */}
          </SheetHeader>

          {/* Scrollable area for wishlist items */}
          <div className="h-[68vh] max-h-[68vh] overflow-y-auto mt-6">
            <div className="space-y-6 bg-white pr-4">
              {wishlist.length > 0 ? (
                wishlist.map((item: any) => (
                  <SideWishListItem
                    data={item}
                    key={item._id}
                    removeFromWishListHandler={removeFromWishListHandler} // Wishlist handler
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">Your wishlist is empty</p> // Wishlist empty message
              )}
            </div>
          </div>

          {/* View Wishlist and Checkout buttons */}
          <div className="mt-4">
            <Link href="/wishlist">
              <Button className="w-full bg-main-500 hover:bg-main-600 text-white">
                View Wishlist
              </Button>
            </Link>
            {isAuthenticated ? (
              <Button variant="outline" className="w-full mt-2">
                Checkout
              </Button>
            ) : (
              <Button variant="outline" className="w-full mt-2">
                Login to checkout
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default WishListSidebar;