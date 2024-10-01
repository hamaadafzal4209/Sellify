import cloudinary from "cloudinary";
import Category from "../models/categoryModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// Create Category with Cloudinary Image Upload
export const createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, imageBase64 } = req.body;

  // Check if the name is provided
  if (!name) {
    return next(new ErrorHandler("Category name is required", 400));
  }

  // Check if the image is provided
  if (!imageBase64) {
    return next(new ErrorHandler("Please provide an image in Base64 format", 400));
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(imageBase64, {
      folder: "categories",
      width: 500,
      crop: "scale",
    });

    // Create new category with the Cloudinary image URLs
    const newCategory = await Category.create({
      name,
      image: [
        {
          public_url: result.secure_url, // Cloudinary secure URL
          url: result.url, // Cloudinary URL
        },
      ],
    });

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});