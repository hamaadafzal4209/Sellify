import cloudinary from "cloudinary";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Category from "../models/categoryModel.js";

// Create Category 
export const createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler("Category name is required", 400));
  }

  if (!req.file) {
    return next(new ErrorHandler("Please upload an image", 400));
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "categories",
      width: 500,
      crop: "scale",
    });

    // Create new category with image details
    const newCategory = await Category.create({
      name,
      imageUrl: result.secure_url, // Cloudinary secure URL
      public_id: result.public_id,  // Cloudinary public_id
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
