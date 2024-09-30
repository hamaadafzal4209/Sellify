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
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    category: "",
    images: [],
    features: [""],
  });

  const [errors, setErrors] = useState({});
  const [isDragActive, setIsDragActive] = useState(false);

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
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...newImages],
      }));
      setIsDragActive(false);
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const handleDeleteImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    setFormData((prevData) => ({
      ...prevData,
      features: [...prevData.features, ""],
    }));
  };

  const handleDeleteFeature = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      features: prevData.features.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      features: updatedFeatures,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName)
      newErrors.productName = "Product name is required";
    if (!formData.productDescription)
      newErrors.productDescription = "Product description is required";
    if (!formData.originalPrice || Number(formData.originalPrice) <= 0) {
      newErrors.originalPrice = "Original price must be a positive number";
    }
    if (formData.discountPrice && Number(formData.discountPrice) <= 0) {
      newErrors.discountPrice = "Discount price must be a positive number";
    }
    if (
      !formData.stock ||
      Number.isNaN(Number(formData.stock)) ||
      Number(formData.stock) < 0
    ) {
      newErrors.stock = "Stock quantity must be a non-negative integer";
    }
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required.";
    }
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form data before sending:", formData); // Debugging log

    // Create a FormData object to handle the file upload
    const formDataToSend = new FormData();

    // Append other data
    formDataToSend.append("name", formData.productName);
    formDataToSend.append("description", formData.productDescription);
    formDataToSend.append("originalPrice", formData.originalPrice);
    formDataToSend.append("discountPrice", formData.discountPrice);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("features", JSON.stringify(formData.features)); // stringify features

    // Append images to the FormData
    formData.images.forEach((file) => {
      formDataToSend.append("images[]", file);
    });

    // Log to see if images are present
    console.log(
      "Images to send:",
      [...formDataToSend.entries()].filter(([key]) => key === "images[]")
    ); // check what's being sent

    const toastId = toast.loading("Creating product...");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/product/create-product",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Product created successfully!", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create product", { id: toastId });
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <h2 className="section-heading text-center text-gray-900 text-2xl font-bold mb-2">
          Create New Product
        </h2>
      </div>

      <ScrollArea className="mt-6 sm:mx-auto shadow-md bg-white p-6 sm:p-8 rounded-lg max-h-[65vh] max-w-xl">
        <form onSubmit={onSubmit} className="space-y-6">
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
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
              className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-main-500 ${
                errors.productName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
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
              value={formData.productDescription}
              onChange={(e) =>
                setFormData({ ...formData, productDescription: e.target.value })
              }
              className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-main-500 ${
                errors.productDescription ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.productDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productDescription}
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
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: e.target.value })
                }
                className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-main-500 ${
                  errors.originalPrice ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.originalPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.originalPrice}
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
                placeholder="Enter discount price (optional)"
                value={formData.discountPrice}
                onChange={(e) =>
                  setFormData({ ...formData, discountPrice: e.target.value })
                }
                className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-main-500 ${
                  errors.discountPrice ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.discountPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discountPrice}
                </p>
              )}
            </div>
          </div>

          {/* Stock */}
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
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className={`mt-1 p-3 rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-main-500 ${
                errors.stock ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label
              htmlFor="category"
              className="block text-sm font-medium text-gray-900"
            >
              Category
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              value={formData.category}
            >
              <SelectTrigger
                className={`mt-1 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="toys">Toys</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Image Upload */}
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 rounded-md p-4 flex flex-col items-center"
          >
            <input {...getInputProps()} />
            <p className="text-center">
              {isDragActive
                ? "Drop the files here..."
                : "Drag 'n' drop some images here, or click to select files"}
            </p>
            <Button className="mt-2" variant="outline">
              <Upload className="mr-2" /> Upload Images
            </Button>
          </div>
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {formData.images.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={file.preview}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            <Label className="block text-sm font-medium text-gray-900">
              Features
            </Label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => handleDeleteFeature(index)}
                  variant="outline"
                  className="text-red-500"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={addFeature}
              variant="outline"
              className="mt-2"
            >
              Add Feature
            </Button>
          </div>

          <Button type="submit" className="w-full" variant="primary">
            Create Product
          </Button>
        </form>
      </ScrollArea>
    </div>
  );
};

export default CreateProduct;
