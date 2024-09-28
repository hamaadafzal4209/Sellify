"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingCart, Package, Users, Plus, Pencil, Trash2, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: ShoppingCart, label: 'Orders', href: '/orders' },
  { icon: Package, label: 'Products', href: '/products' },
  { icon: Users, label: 'Categories', href: '/categories' },
]

// Mock data for categories
const initialCategories = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and gadgets' },
  { id: '2', name: 'Clothing', description: 'Apparel and fashion items' },
  { id: '3', name: 'Books', description: 'Physical and digital books' },
  { id: '4', name: 'Home & Garden', description: 'Items for home and garden' },
  { id: '5', name: 'Sports & Outdoors', description: 'Sporting goods and outdoor equipment' },
]

function SidebarContent() {
  const pathname = usePathname()
  return (
    <ScrollArea className="flex-grow">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Panel
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-start rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default function CategoriesPage() {
  const [categories, setCategories] = React.useState(initialCategories)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [currentCategory, setCurrentCategory] = React.useState(null)
  const [newCategoryName, setNewCategoryName] = React.useState('')
  const [newCategoryDescription, setNewCategoryDescription] = React.useState('')

  const handleCreateCategory = () => {
    const newCategory = {
      id: (categories.length + 1).toString(),
      name: newCategoryName,
      description: newCategoryDescription,
    }
    setCategories([...categories, newCategory])
    setNewCategoryName('')
    setNewCategoryDescription('')
    setIsEditDialogOpen(false)
  }

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map(cat =>
      cat.id === currentCategory.id ? { ...cat, name: newCategoryName, description: newCategoryDescription } : cat
    )
    setCategories(updatedCategories)
    setIsEditDialogOpen(false)
  }

  const handleDeleteCategory = () => {
    const updatedCategories = categories.filter(cat => cat.id !== currentCategory.id)
    setCategories(updatedCategories)
    setIsDeleteDialogOpen(false)
    setCurrentCategory(null)
  }

  const openEditDialog = (category = null) => {
    setCurrentCategory(category)
    setNewCategoryName(category ? category.name : '')
    setNewCategoryDescription(category ? category.description : '')
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (category) => {
    setCurrentCategory(category)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 border-r bg-muted/40 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
          </div>
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="flex h-14 items-center border-b px-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-full flex-col">
                <div className="flex h-14 items-center border-b px-4">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Package className="h-6 w-6" />
                    <span className="">Acme Inc</span>
                  </Link>
                </div>
                <SidebarContent />
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold">Categories</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-4 p-4 md:p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold hidden lg:block">Categories</h2>
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => openEditDialog()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{currentCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                    <DialogDescription>
                      {currentCategory ? 'Edit the details of the category.' : 'Add a new category to your store.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        value={newCategoryDescription}
                        onChange={(e) => setNewCategoryDescription(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={currentCategory ? handleUpdateCategory : handleCreateCategory}>
                      {currentCategory ? 'Update' : 'Create'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(category)}
                          className="mr-2"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit {category.name}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(category)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete {category.name}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this category?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category
              "{currentCategory?.name}" and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}