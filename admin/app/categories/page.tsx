// pages/categories.js
"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
  updateCategory,
} from "../redux/Features/category/categoryAction";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { allCategories, isLoading } = useSelector((state) => state.category);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCreateCategory = () => {
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(createCategory(newCategoryName, reader.result));
      toast.success("Category created successfully!");
      setLoading(false);
      setNewCategoryName("");
      setNewCategoryImage(null);
      setIsEditDialogOpen(false); // Close dialog on successful creation
    };
    if (newCategoryImage) {
      reader.readAsDataURL(newCategoryImage);
    } else {
      toast.error("Please select an image.");
      setLoading(false);
    }
  };

  const handleUpdateCategory = () => {
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        updateCategory(currentCategory._id, newCategoryName, reader.result)
      );
      toast.success("Category updated successfully!");
      setLoading(false);
      setCurrentCategory(null);
      setNewCategoryName("");
      setNewCategoryImage(null);
      setIsEditDialogOpen(false);
    };
    if (newCategoryImage) {
      reader.readAsDataURL(newCategoryImage);
    } else {
      dispatch(updateCategory(currentCategory._id, newCategoryName));
      toast.success("Category updated successfully!");
      setLoading(false);
      setCurrentCategory(null);
      setNewCategoryName("");
      setNewCategoryImage(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
    toast.success("Category deleted successfully!");
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="max-w-3xl w-full mx-auto p-4 pb-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
          Categories
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-main-500 text-white hover:bg-main-600">
              <Plus className="mr-2  hidden sm:block" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="mb-4"
            />
            <Label htmlFor="category-image">Upload Image</Label>
            <Input
              id="category-image"
              type="file"
              accept="image/*"
              onChange={(e) => setNewCategoryImage(e.target.files[0])}
              className="mb-4"
            />
            <DialogFooter>
              <Button
                onClick={handleCreateCategory}
                disabled={loading}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <ScrollArea>
        <div className="flex flex-wrap">
          {allCategories
            .filter((category) =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((category) => (
              <div
                key={category._id}
                className="flex items-center border-b py-2 w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={category.image[0].public_url}
                    alt={category.name}
                    width={50}
                    height={50}
                    className="rounded w-12 h-12"
                  />
                  <span className="text-base md:text-lg">{category.name}</span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentCategory(category);
                      setNewCategoryName(category.name);
                      setIsEditDialogOpen(true);
                    }}
                    className="mr-2"
                  >
                    <Pencil className="mr-1" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" color="red">
                        <Trash2 className="mr-1" />
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
                        <AlertDialogAction
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <Label htmlFor="edit-category-name">Category Name</Label>
          <Input
            id="edit-category-name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="mb-4"
          />
          <Label htmlFor="edit-category-image">Upload New Image</Label>
          <Input
            id="edit-category-image"
            type="file"
            accept="image/*"
            onChange={(e) => setNewCategoryImage(e.target.files[0])}
            className="mb-4"
          />
          <DialogFooter>
            <Button
              onClick={handleUpdateCategory}
              disabled={loading}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
