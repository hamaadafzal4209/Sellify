"use client";

import React, { useEffect, useState } from "react";
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all categories from the API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/category/get-all-categories"
        );
        setCategories(response.data.categories);
      } catch (error) {
        toast.error("Error fetching categories.");
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = async () => {
    setLoading(true);
    const toastId = toast.loading("Creating category...");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/category/create-category",
        {
          name: newCategoryName,
          imageBase64: await convertToBase64(newCategoryImage), // Convert to Base64
        }
      );

      const newCategory = response.data.category;
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully!", { id: toastId });
      resetForm();
    } catch (error) {
      toast.error("Error creating category.", { id: toastId });
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    setLoading(true);
    const toastId = toast.loading("Updating category...");
    try {
      const imageBase64 = newCategoryImage
        ? await convertToBase64(newCategoryImage)
        : null; // Convert to Base64 if new image is provided

      const response = await axios.put(
        `http://localhost:8000/api/category/update-category/${currentCategory._id}`,
        {
          name: newCategoryName,
          imageBase64: imageBase64,
        }
      );

      const updatedCategories = categories.map((cat) =>
        cat._id === currentCategory._id ? response.data.category : cat
      );
      setCategories(updatedCategories);
      toast.success("Category updated successfully!", { id: toastId });
      resetForm();
    } catch (error) {
      toast.error("Error updating category.", { id: toastId });
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    const toastId = toast.loading("Deleting category...");
    try {
      await axios.delete(
        `http://localhost:8000/api/category/delete-category/${currentCategory._id}`
      );

      const updatedCategories = categories.filter(
        (cat) => cat._id !== currentCategory._id
      );
      setCategories(updatedCategories);
      toast.success("Category deleted successfully!", { id: toastId });
      setIsDeleteDialogOpen(false);
      setCurrentCategory(null);
    } catch (error) {
      toast.error("Error deleting category.", { id: toastId });
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert image file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const resetForm = () => {
    setNewCategoryName("");
    setNewCategoryImage(null);
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (category = null) => {
    setCurrentCategory(category);
    setNewCategoryName(category ? category.name : "");
    setNewCategoryImage(null);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="max-w-2xl w-full px-6 py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs"
          />
          <Button size="icon" className="bg-main-500 hover:bg-main-600">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-main-500 hover:bg-main-600"
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
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-2">
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
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewCategoryImage(e.target.files[0])}
                  className="col-span-3 cursor-pointer"
                />
                {currentCategory && currentCategory.image && (
                  <Image
                    width={20}
                    height={20}
                    src={currentCategory.image[0].url}
                    alt="Category"
                    className="col-span-1 h-10 w-10 object-cover rounded"
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={
                  currentCategory ? handleUpdateCategory : handleCreateCategory
                }
                className="w-full bg-main-500 hover:bg-main-600"
                disabled={loading}
              >
                {loading ? "Saving..." : currentCategory ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  {category.image && (
                    <Image
                      width={40}
                      height={40}
                      src={category.image[0].url}
                      alt={category.name}
                      className="h-10 w-10 object-contain rounded"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => openEditDialog(category)}
                    className="bg-green-500 hover:bg-green-600 mr-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => openDeleteDialog(category)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this category?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setIsDeleteDialogOpen(false)}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteCategory}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
