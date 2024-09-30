"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { X, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

// Zod schema for form validation
const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productDescription: z.string().min(1, "Product description is required"),
  originalPrice: z
    .number()
    .min(1, "Original price must be a positive number")
    .nonnegative(),
  discountPrice: z.number().optional(),
  stock: z.number().nonnegative("Stock quantity must be a non-negative number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  images: z.array(z.any()).min(1, "At least one image is required"),
});

const CreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      originalPrice: 0,
      discountPrice: 0,
      stock: 0,
      category: "",
      tags: [],
      features: [""],
      images: [],
    },
  });

  const images = watch("images");

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => {
        const previewUrl = URL.createObjectURL(file);
        return Object.assign(file, { preview: previewUrl });
      });
      setValue("images", [...images, ...newImages]);
    },
  });

  const handleDeleteImage = (index) => {
    URL.revokeObjectURL(images[index].preview);
    setValue(
      "images",
      images.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const toastId = toast.loading("Creating product...");
    const imageUrls = [];

    try {
      // Upload images to Cloudinary
      for (const file of formData.images) {
        const formDataToSend = new FormData();
        formDataToSend.append("file", file);
        formDataToSend.append("upload_preset", "sellify");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formDataToSend
        );
        imageUrls.push(response.data.secure_url);
      }

      // Send product data to backend
      await axios.post("http://localhost:8000/api/product/create-product", {
        name: formData.productName,
        description: formData.productDescription,
        originalPrice: formData.originalPrice,
        discountPrice: formData.discountPrice,
        stock: formData.stock,
        category: formData.category,
        features: formData.features,
        tags: formData.tags,
        images: imageUrls,
      });

      toast.success("Product created successfully!", { id: toastId });

      // Redirect to /products after success
      router.push("/products");
    } catch (error) {
      toast.error("Failed to create product", { id: toastId });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <h2 className="section-heading text-center text-gray-900 text-2xl font-bold mb-2">
          Create New Product
        </h2>
      </div>

      <ScrollArea className="mt-6 sm:mx-auto shadow-md bg-white p-6 sm:p-8 rounded-lg max-h-[65vh] max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              {...register("productName")}
              className={`${errors.productName ? "border-red-500" : ""}`}
            />
            {errors.productName && (
              <p className="text-red-500 text-xs">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Product Description */}
          <div>
            <Label htmlFor="productDescription">Product Description</Label>
            <Textarea
              id="productDescription"
              {...register("productDescription")}
              className={`${errors.productDescription ? "border-red-500" : ""}`}
            />
            {errors.productDescription && (
              <p className="text-red-500 text-xs">
                {errors.productDescription.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Toys">Toys</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Controller
              control={control}
              name="tags"
              render={({ field }) => (
                <Input
                  id="tags"
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((tag) => tag.trim())
                    )
                  }
                  placeholder="Enter tags separated by commas"
                />
              )}
            />
          </div>

          {/* Features */}
          <div>
            <Label>Features</Label>
            {watch("features").map((feature, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <Input
                  value={feature}
                  onChange={(e) =>
                    setValue(`features.${index}`, e.target.value)
                  }
                  className="w-full"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    setValue(
                      "features",
                      watch("features").filter((_, i) => i !== index)
                    )
                  }
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => setValue("features", [...watch("features"), ""])}
              className="mt-2 w-full bg-main-500 hover:bg-main-600"
            >
              Add Feature
            </Button>
          </div>

          {/* Images Dropzone */}
          <div
            {...getRootProps()}
            className="mt-2 border-dashed border-2 p-6 text-center rounded-md cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some images here, or click to select images</p>
          </div>
          {images.length > 0 && (
            <div className="flex flex-wrap mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 m-2">
                  <img
                    src={image.preview}
                    alt="preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Original Price */}
          <div>
            <Label htmlFor="originalPrice">Original Price</Label>
            <Input
              id="originalPrice"
              type="number"
              {...register("originalPrice", { valueAsNumber: true })}
              className={`${errors.originalPrice ? "border-red-500" : ""}`}
            />
            {errors.originalPrice && (
              <p className="text-red-500 text-xs">
                {errors.originalPrice.message}
              </p>
            )}
          </div>

          {/* Discount Price */}
          <div>
            <Label htmlFor="discountPrice">Discount Price</Label>
            <Input
              id="discountPrice"
              type="number"
              {...register("discountPrice", { valueAsNumber: true })}
            />
          </div>

          {/* Stock */}
          <div>
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className={`${errors.stock ? "border-red-500" : ""}`}
            />
            {errors.stock && (
              <p className="text-red-500 text-xs">{errors.stock.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-main-500 hover:bg-main-600"
            disabled={isLoading}
            variant={isLoading ? "ghost" : "default"}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Product"
            )}
          </Button>
        </form>
      </ScrollArea>
    </div>
  );
};

export default CreateProduct;