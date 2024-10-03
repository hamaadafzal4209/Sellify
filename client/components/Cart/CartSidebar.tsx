import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import SideCartItem from "./SideCartItem";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area"; // Import ScrollArea component from ShadCN

const CartSidebar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-main-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping cart</SheetTitle>
          </SheetHeader>

          {/* Scrollable area for cart items */}
          <ScrollArea className="h-[73vh] max-h-[73vh] overflow-y-auto">
            <div className="space-y-4">
              <SideCartItem />
              <SideCartItem />
              <SideCartItem />
              <SideCartItem />
              <SideCartItem />
              <SideCartItem />
              <SideCartItem />
              <SideCartItem />
            </div>
          </ScrollArea>

          {/* Checkout and View Cart buttons */}
          <div className="mt-4">
            <Button className="w-full bg-main-500 hover:bg-main-600 text-white">
              View Cart
            </Button>
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

export default CartSidebar;
