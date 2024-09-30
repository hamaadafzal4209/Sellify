"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react"; // For table actions
import {
  FaHome,
  FaUser,
  FaCog,
  FaSearch,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaBell,
  FaGlobe,
  FaHeart,
  FaCar,
  FaPlane,
  FaStar,
  FaMusic,
  FaFilm,
  FaBook,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaLightbulb,
  FaWifi,
} from "react-icons/fa"; // For category icons
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

// Define 20 commonly used icons
const commonIcons = [
  { name: "Home", component: <FaHome /> },
  { name: "User", component: <FaUser /> },
  { name: "Settings", component: <FaCog /> },
  { name: "Search", component: <FaSearch /> },
  { name: "Camera", component: <FaCamera /> },
  { name: "Email", component: <FaEnvelope /> },
  { name: "Phone", component: <FaPhone /> },
  { name: "Bell", component: <FaBell /> },
  { name: "World", component: <FaGlobe /> },
  { name: "Heart", component: <FaHeart /> },
  { name: "Car", component: <FaCar /> },
  { name: "Plane", component: <FaPlane /> },
  { name: "Star", component: <FaStar /> },
  { name: "Music", component: <FaMusic /> },
  { name: "Film", component: <FaFilm /> },
  { name: "Book", component: <FaBook /> },
  { name: "Cart", component: <FaShoppingCart /> },
  { name: "Location", component: <FaMapMarkerAlt /> },
  { name: "Light", component: <FaLightbulb /> },
  { name: "Wifi", component: <FaWifi /> },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isIconDialogOpen, setIsIconDialogOpen] = useState(false); // New state for icon dialog
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [iconSearchTerm, setIconSearchTerm] = useState("");

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
      icon: newCategoryIcon,
    };
    setCategories([...categories, newCategory]);
    resetForm();
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map((cat) =>
      cat.id === currentCategory.id
        ? {
            ...cat,
            name: newCategoryName,
            description: newCategoryDescription,
            icon: newCategoryIcon,
          }
        : cat
    );
    setCategories(updatedCategories);
    resetForm();
  };

  const handleDeleteCategory = () => {
    const updatedCategories = categories.filter(
      (cat) => cat.id !== currentCategory.id
    );
    setCategories(updatedCategories);
    setIsDeleteDialogOpen(false);
    setCurrentCategory(null);
  };

  const resetForm = () => {
    setNewCategoryName("");
    setNewCategoryDescription("");
    setNewCategoryIcon("");
    setIconSearchTerm("");
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (category = null) => {
    setCurrentCategory(category);
    setNewCategoryName(category ? category.name : "");
    setNewCategoryDescription(category ? category.description : "");
    setNewCategoryIcon(category ? category.icon : "");
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const openIconDialog = () => {
    setIsIconDialogOpen(true);
    setIconSearchTerm("");
  };

  const selectIcon = (icon) => {
    setNewCategoryIcon(icon.component);
    setIsIconDialogOpen(false);
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
                <Label htmlFor="icon" className="text-right">
                  Icon
                </Label>
                <Input
                  id="icon"
                  value={newCategoryIcon}
                  readOnly
                  placeholder="Select an icon..."
                  className="col-span-3 cursor-pointer"
                  onClick={openIconDialog}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={
                  currentCategory ? handleUpdateCategory : handleCreateCategory
                }
                className="bg-main-500 hover:bg-main-600"
              >
                {currentCategory ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border overflow-hidden">
        <ScrollArea className="h-[calc(100vh-250px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
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
                  <TableCell className="font-medium">
                    <span>{category.icon}</span>
                  </TableCell>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Icon Selection Dialog */}
      <Dialog open={isIconDialogOpen} onOpenChange={setIsIconDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select an Icon</DialogTitle>
            <DialogDescription>
              Choose an icon for the category.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-wrap gap-2">
              {commonIcons.map((icon) => (
                <Button
                  key={icon.name}
                  variant="outline"
                  onClick={() => selectIcon(icon)}
                >
                  <span className="mr-2">{icon.component}</span>
                  {icon.name}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsIconDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
