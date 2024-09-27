'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import Image from 'next/image'

// Mock data for cart items
const initialCartItems = [
  { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 2, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Smart Watch", price: 199.99, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Bluetooth Speaker", price: 59.99, quantity: 3, image: "/placeholder.svg?height=100&width=100" },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

function CartItem({ item, onUpdateQuantity, onRemove }: { 
  item: CartItem
  onUpdateQuantity: (id: number, newQuantity: number) => void
  onRemove: (id: number) => void 
}) {
  return (
    <div className="flex items-start space-x-4 py-6">
      <div className="relative h-24 w-24 overflow-hidden rounded-md border bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm font-medium text-primary">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <span className="text-center w-8">{item.quantity}</span>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => onRemove(item.id)}
        className="self-center"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function CartSidebar() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart ({itemCount} items)</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)] py-4">
          {cartItems.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </ScrollArea>
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center py-4 font-medium text-lg border-t">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}