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
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
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

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = async () => {
    setLoading(true);
    toast.loading("Creating category...");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/category/create-category",
        {
          name: newCategoryName,
          imageBase64: await convertToBase64(newCategoryImage),
        }
      );

      const newCategory = response.data.category;
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error creating category.");
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    setLoading(true);
    try {
      const imageUrl = newCategoryImage
        ? await uploadImage(newCategoryImage)
        : currentCategory.image;

      const response = await axios.put(
        `http://localhost:8000/api/category/update-category/${currentCategory._id}`,
        {
          name: newCategoryName,
          description: newCategoryDescription,
          image: imageUrl,
        }
      );

      const updatedCategories = categories.map((cat) =>
        cat._id === currentCategory._id ? response.data.category : cat
      );
      setCategories(updatedCategories);
      toast.success("Category updated successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error updating category.");
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    toast.loading("Deleting category...");
    try {
      await axios.delete(
        `http://localhost:8000/api/category/delete-category/${currentCategory._id}`
      );

      const updatedCategories = categories.filter(
        (cat) => cat._id !== currentCategory._id
      );
      setCategories(updatedCategories);
      toast.success("Category deleted successfully!");
      setIsDeleteDialogOpen(false);
      setCurrentCategory(null);
    } catch (error) {
      toast.error("Error deleting category.");
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to upload image to Cloudinary
  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      throw new Error("Error uploading image.");
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
    setNewCategoryDescription("");
    setNewCategoryImage(null);
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (category = null) => {
    setCurrentCategory(category);
    setNewCategoryName(category ? category.name : "");
    setNewCategoryDescription(category ? category.description : "");
    setNewCategoryImage(null);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="max-w-5xl w-full px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="flex justify-between items-center mb-4 flex-col sm:flex-row">
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
              <DialogDescription>
                {currentCategory
                  ? "Edit the details of the category."
                  : "Add a new category to your store."}
              </DialogDescription>
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
                className={`bg-main-500 hover:bg-main-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : currentCategory
                  ? "Update"
                  : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <Image
                    src={category.image[0].url}
                    alt={category.name}
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => openEditDialog(category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => openDeleteDialog(category)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
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
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={`bg-red-600 hover:bg-red-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleDeleteCategory}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
