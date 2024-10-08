import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Link from "next/link";
import {
  addTocartAction,
  removeFromCartAction,
} from "@/app/redux/Features/cart/cartAction";

const CartSidebar = () => {
  const { isAuthenticated } = useSelector((state : any) => state.user);
  const { cart = [] } = useSelector((state : any) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCartAction(data._id));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addTocartAction(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-main-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length || 0}
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping cart</SheetTitle>
          </SheetHeader>

          {/* Scrollable area for cart items */}
          <div className="h-[68vh] max-h-[68vh] overflow-y-auto mt-6">
            <div className="space-y-6 bg-white pr-4">
              {cart.length > 0 ? (
                cart.map((item: any) => (
                  <SideCartItem
                    data={item}
                    key={item._id}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty</p>
              )}
            </div>
          </div>

          {/* Checkout and View Cart buttons */}
          <div className="mt-4">
            <Link href="/cart">
              <Button className="w-full bg-main-500 hover:bg-main-600 text-white">
                View Cart
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

export default CartSidebar;
