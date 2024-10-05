"use client"
import { useState } from 'react'
import { Trash2, ShoppingCart, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'

// Mock data for wishlist items
const initialWishlistItems = [
  { id: 1, name: 'Wireless Headphones', price: 129.99, image: '/placeholder.svg?height=200&width=200', inStock: true },
  { id: 2, name: 'Smartwatch', price: 199.99, image: '/placeholder.svg?height=200&width=200', inStock: false },
  { id: 3, name: 'Portable Charger', price: 49.99, image: '/placeholder.svg?height=200&width=200', inStock: true },
  { id: 4, name: 'Bluetooth Speaker', price: 79.99, image: '/placeholder.svg?height=200&width=200', inStock: true },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  const addToCart = (id: number) => {
    // Implement add to cart functionality here
    console.log(`Added item ${id} to cart`)
  }

  const clearWishlist = () => {
    setWishlistItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  const totalItems = wishlistItems.length
  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            Clear All
          </Button>
        )}
      </div>
      
      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Your wishlist is empty.</p>
            <Button className="mt-4" variant="outline">
                <Link href='/products'>Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
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
            {wishlistItems.map((item) => (
              <Card key={item.id} className="wishlist-item overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <Badge 
                      variant={item.inStock ? "secondary" : "destructive"} 
                      className="absolute top-2 right-2"
                    >
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h2>
                    <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-between p-4">
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                    className="wishlist-item__remove"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                  <Button 
                    onClick={() => addToCart(item.id)}
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
        </>
      )}
    </div>
  )
}