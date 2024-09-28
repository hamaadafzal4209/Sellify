"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, X } from "lucide-react"; // For the upload and delete icons
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import arrayMove from "array-move";

const CreateProduct = () => {
  const [status, setStatus] = useState(true);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle image drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file), // Create a preview URL
        })
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    },
  });

  // Handle image reordering
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const reorderedImages = arrayMove(images, source.index, destination.index);
    setImages(reorderedImages);
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      productName,
      productDescription,
      price,
      sku,
      stock,
      category,
      status,
      images,
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="section-heading text-center text-gray-900">Create New Product</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="productName" className="block text-sm font-medium text-gray-900">
              Product Name
            </Label>
            <Input
              id="productName"
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {/* Product Description */}
          <div>
            <Label htmlFor="productDescription" className="block text-sm font-medium text-gray-900">
              Product Description
            </Label>
            <Textarea
              id="productDescription"
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {/* Price and SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="block text-sm font-medium text-gray-900">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sku" className="block text-sm font-medium text-gray-900">
                SKU
              </Label>
              <Input
                id="sku"
                type="text"
                placeholder="Enter SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* Stock and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stock" className="block text-sm font-medium text-gray-900">
                Stock Quantity
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="Enter stock quantity"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="category" className="block text-sm font-medium text-gray-900">
                Category
              </Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upload Images */}
          <div>
            <Label htmlFor="images" className="block text-sm font-medium text-gray-900">
              Product Images
            </Label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-md p-4 mt-1 flex flex-col items-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <Upload className="w-8 h-8 text-gray-500" />
              <p className="text-gray-500 mt-2">Drag & drop images here, or click to select</p>
            </div>
          </div>

          {/* Display Uploaded Images with Drag-and-Drop Support */}
          {images.length > 0 && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="images">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap gap-4">
                    {images.map((image, index) => (
                      <Draggable key={image.preview} draggableId={image.preview} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="relative group"
                          >
                            <img
                              src={image.preview}
                              alt={`uploaded-img-${index}`}
                              className="w-20 h-20 object-cover rounded-md shadow-md"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          {/* Product Status */}
          <div className="flex items-center mt-4">
            <Label htmlFor="status" className="text-sm font-medium text-gray-900">
              Active
            </Label>
            <Switch
              id="status"
              checked={status}
              onCheckedChange={setStatus}
              className="ml-3"
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="submit-full-button mt-6">
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;