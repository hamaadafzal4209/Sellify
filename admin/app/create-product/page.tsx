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
  originalPrice: z
    .number()
    .positive("Original price must be a positive number"),
  discountPrice: z
    .number()
    .positive("Discount price must be a positive number")
    .optional()
    .refine((value, ctx) => {
      const originalPrice = ctx.parent.originalPrice;
      return value <= originalPrice;
    }, "Discount price cannot exceed original price"),
  stock: z
    .number()
    .int()
    .nonnegative("Stock quantity must be a non-negative integer"),
  category: z.string().nonempty("Category is required"),
  images: z
    .array(
      z.object({
        public_url: z.string().url("Invalid public URL"),
        url: z.string().url("Invalid image URL"),
      })
    )
    .nonempty("At least one image is required"),
  features: z.array(z.string()),
});

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [features, setFeatures] = useState([""]);

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
          public_url: "", // Replace with real public_url
        })
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
      setIsDragActive(false);
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const addFeature = () => setFeatures((prevFeatures) => [...prevFeatures, ""]);

  const handleDeleteFeature = (index) => {
    setFeatures((prevFeatures) => prevFeatures.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      originalPrice: parseFloat(data.originalPrice),
      discountPrice: data.discountPrice
        ? parseFloat(data.discountPrice)
        : undefined,
      stock: parseInt(data.stock, 10),
      images,
      features,
    };

    const toastId = toast.loading("Creating product...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("Product created successfully!", { id: toastId });
      console.log(productData);
    } catch (error) {
      toast.error("Failed to create product", { id: toastId });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <h2 className="section-heading text-center text-gray-900 text-2xl font-bold mb-2">
          Create New Product
        </h2>
      </div>

      <ScrollArea className="mt-6 sm:mx-auto shadow-md bg-white p-6 sm:p-8 rounded-lg max-h-[65vh]">
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
              className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
              className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.productDescription ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.productDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productDescription.message}
              </p>
            )}
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="originalPrice"
                className="block text-sm font-medium text-gray-900"
              >
                Original Price ($)
              </Label>
              <Input
                id="originalPrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter original price"
                {...register("originalPrice", { valueAsNumber: true })}
                className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.originalPrice ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.originalPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.originalPrice.message}
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
                className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.discountPrice ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.discountPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discountPrice.message}
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
                className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                <SelectTrigger className="mt-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
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

          {/* Features */}
          <div>
            <Label
              htmlFor="features"
              className="block text-sm font-medium text-gray-900"
            >
              Features
            </Label>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  onClick={() => handleDeleteFeature(index)}
                  className="bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={addFeature}
              className="mt-2 bg-main-500 hover:bg-main-600 transition-all duration-300"
            >
              Add Feature
            </Button>
            {errors.features && (
              <p className="text-red-500 text-sm mt-1">
                {errors.features.message}
              </p>
            )}
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
              className={`mt-1 border-dashed border-2 p-4 rounded-lg transition-all cursor-pointer ${
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
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={file.preview}
                      alt="Preview"
                      className="h-24 w-24 object-contain rounded-lg border border-gray-300 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200"
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
              className={`w-full py-3 bg-main-500 text-white rounded-lg hover:bg-main-600 transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
};

export default CreateProduct;
