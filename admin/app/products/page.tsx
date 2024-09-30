"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Menu,
  Search,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/product/get-all-products");

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Products:", data);

        // Check if the response indicates success
        if (data.success && Array.isArray(data.allProducts)) {
          setProducts(data.allProducts);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log(`Deleting product: ${productToDelete?.name}`);
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-background pb-10">
      <main className="flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-4 p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Input
                  placeholder="Search products..."
                  className="w-full md:w-[250px]"
                />
                <Button
                  size="sm"
                  className="bg-main-500 hover:bg-main-600 transition-all duration-300"
                >
                  <Search className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <ScrollArea className="h-[calc(100vh-250px)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          Loading products...
                        </TableCell>
                      </TableRow>
                    ) : products.length > 0 ? (
                      products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="table-cell">
                            <Badge variant="secondary">{product.category}</Badge>
                          </TableCell>
                          <TableCell>${product.price ? product.price.toFixed(2) : 'N/A'}</TableCell>
                          <TableCell className="table-cell">{product.stock}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(product)}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Product</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete {productToDelete?.name}?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteConfirm} className="ml-2">
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
}