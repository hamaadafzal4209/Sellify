"use client";

import React from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for categories
const initialCategories = [
  {
    id: "1",
    name: "Electronics",
    description: "Electronic devices and gadgets",
  },
  { id: "2", name: "Clothing", description: "Apparel and fashion items" },
  { id: "3", name: "Books", description: "Physical and digital books" },
  { id: "4", name: "Home & Garden", description: "Items for home and garden" },
  {
    id: "5",
    name: "Sports & Outdoors",
    description: "Sporting goods and outdoor equipment",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = React.useState(initialCategories);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState(null);
  const [newCategoryName, setNewCategoryName] = React.useState("");
  const [newCategoryDescription, setNewCategoryDescription] =
    React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = () => {
    const newCategory = {
      id: (categories.length + 1).toString(),
      name: newCategoryName,
      description: newCategoryDescription,
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setNewCategoryDescription("");
    setIsEditDialogOpen(false);
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map((cat) =>
      cat.id === currentCategory.id
        ? { ...cat, name: newCategoryName, description: newCategoryDescription }
        : cat
    );
    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
  };

  const handleDeleteCategory = () => {
    const updatedCategories = categories.filter(
      (cat) => cat.id !== currentCategory.id
    );
    setCategories(updatedCategories);
    setIsDeleteDialogOpen(false);
    setCurrentCategory(null);
  };

  const openEditDialog = (category = null) => {
    setCurrentCategory(category);
    setNewCategoryName(category ? category.name : "");
    setNewCategoryDescription(category ? category.description : "");
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="max-w-5xl w-full px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button
            size="icon"
            className="bg-main-500 hover:bg-main-600 transition-all duration-300"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search categories</span>
          </Button>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-main-500 hover:bg-main-600 transition-all duration-300"
              onClick={() => openEditDialog()}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentCategory ? "Edit Category" : "Add New Category"}
              </DialogTitle>
              <DialogDescription>
                {currentCategory
                  ? "Edit the details of the category."
                  : "Add a new category to your store."}
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
              <Button
                onClick={
                  currentCategory ? handleUpdateCategory : handleCreateCategory
                }
              >
                {currentCategory ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-[calc(100vh-250px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {category.description}
                  </TableCell>
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
        </ScrollArea>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this category?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category "{currentCategory?.name}" and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
