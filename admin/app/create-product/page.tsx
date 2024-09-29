"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the validation schema with Zod
const productSchema = z.object({
  productName: z.string().nonempty("Product name is required"),
  productDescription: z.string().nonempty("Product description is required"),
  price: z.number().positive("Price must be a positive number"),
  oldPrice: z
    .number()
    .nonnegative("Old price must be a non-negative number")
    .optional(),
  discountPrice: z
    .number()
    .nonnegative("Discount price must be a non-negative number")
    .optional(),
  stock: z
    .number()
    .int()
    .nonnegative("Stock quantity must be a non-negative integer"),
  category: z.string().nonempty("Category is required"),
  images: z
    .array(
      z.object({
        preview: z.string().url("Invalid image URL"),
      })
    )
    .nonempty("At least one image is required"),
});

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
      setIsDragActive(false);
    },
    onDragEnter: () => {
      setIsDragActive(true);
    },
    onDragLeave: () => {
      setIsDragActive(false);
    },
  });

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      price: parseFloat(data.price),
      oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : undefined,
      discountPrice: data.discountPrice
        ? parseFloat(data.discountPrice)
        : undefined,
      stock: parseInt(data.stock, 10),
      images,
    };

    const toastId = toast.loading("Creating product...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Product created successfully!", { id: toastId });
      console.log(productData);
    } catch (error) {
      toast.error("Failed to create product", { id: toastId });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="section-heading text-center text-gray-900 text-2xl font-bold">
          Create New Product
        </h2>
      </div>

      <ScrollArea className="mt-6 sm:mx-auto shadow-md bg-white p-4 sm:p-6 rounded-md overflow-y-auto max-h-[70vh]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <Label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-900"
            >
              Product Name
            </Label>
            <Input
              id="productName"
              type="text"
              placeholder="Enter product name"
              {...register("productName")}
              className={`mt-1 focus:ring-main-500 outline-none transition duration-200 p-3 rounded-md border ${
                errors.productName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Product Description */}
          <div>
            <Label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-900"
            >
              Product Description
            </Label>
            <Textarea
              id="productDescription"
              placeholder="Enter product description"
              {...register("productDescription")}
              className={`mt-1 focus:ring-main-500 outline-none border transition duration-200 p-3 rounded-md ${
                errors.productDescription ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.productDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productDescription.message}
              </p>
            )}
          </div>

          {/* Price, Old Price, and Discount Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label
                htmlFor="oldPrice"
                className="block text-sm font-medium text-gray-900"
              >
                Old Price ($)
              </Label>
              <Input
                id="oldPrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter old price"
                {...register("oldPrice", { valueAsNumber: true })}
                className={`mt-1 focus:ring-main-500 outline-none border transition duration-200 p-3 rounded-md ${
                  errors.oldPrice ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.oldPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.oldPrice.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="discountPrice"
                className="block text-sm font-medium text-gray-900"
              >
                Discount Price ($)
              </Label>
              <Input
                id="discountPrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter discount price"
                {...register("discountPrice", { valueAsNumber: true })}
                className={`mt-1 focus:ring-main-500 outline-none border transition duration-200 p-3 rounded-md ${
                  errors.discountPrice ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.discountPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discountPrice.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="price"
                className="block text-sm font-medium text-gray-900"
              >
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter price"
                {...register("price", { valueAsNumber: true })}
                required
                className={`mt-1 focus:ring-main-500 outline-none border transition duration-200 p-3 rounded-md ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Stock and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-900"
              >
                Stock Quantity
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="Enter stock quantity"
                {...register("stock", { valueAsNumber: true })}
                required
                className={`mt-1 focus:ring-main-500 outline-none border transition duration-200 p-3 rounded-md ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="category"
                className="block text-sm font-medium text-gray-900"
              >
                Category
              </Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger
                  id="category"
                  className="mt-1 focus:ring-main-500 outline-none border transition duration-200 border-gray-300 rounded-md p-3"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Upload Images */}
          <div>
            <Label
              htmlFor="images"
              className="block text-sm font-medium text-gray-900"
            >
              Product Images
            </Label>
            <div
              {...getRootProps()}
              className={`mt-1 border-dashed border-2 p-4 rounded-lg transition duration-200 ${
                isDragActive ? "border-main-500" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-center text-gray-500">
                <Upload className="w-6 h-6 mx-auto mb-2" />
                Drag 'n' drop some files here, or click to select files
              </p>
            </div>
            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={file.preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`submit-full-button !hover:bg-main-600 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Create Product
            </Button>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
};

export default CreateProduct;
