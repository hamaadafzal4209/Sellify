import cloudinary from "cloudinary";
import Category from "../models/categoryModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// Create Category with Cloudinary Image Upload
export const createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, imageBase64 } = req.body;

  if (!name) {
    return next(new ErrorHandler("Category name is required", 400));
  }

  if (!imageBase64) {
    return next(
      new ErrorHandler("Please provide an image in Base64 format", 400)
    );
  }

  try {
    const result = await cloudinary.v2.uploader.upload(imageBase64, {
      folder: "categories",
      width: 500,
      crop: "scale",
    });

    const newCategory = await Category.create({
      name,
      image: [
        {
          public_id: result.public_id,
          public_url: result.secure_url,
          url: result.url,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get All Categories
export const getAllCategories = catchAsyncErrors(async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message));
  }
});

// Update Category
export const updateCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, imageBase64 } = req.body;
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  // Update name if provided
  if (name) {
    category.name = name;
  }

  // Update image if provided
  if (imageBase64) {
    // Delete the old image from Cloudinary
    if (category.image && category.image[0]) {
      await cloudinary.v2.uploader.destroy(category.image[0].public_id);
    }

    const result = await cloudinary.v2.uploader.upload(imageBase64, {
      folder: "categories",
      width: 500,
      crop: "scale",
    });

    category.image = [
      {
        public_id: result.public_id,
        public_url: result.secure_url,
        url: result.url,
      },
    ];
  }

  // Save the updated category
  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
});

// Delete Category
export const deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  // Delete the image from Cloudinary
  if (category.image && category.image[0]) {
    await cloudinary.v2.uploader.destroy(category.image[0].public_id);
  }

  // Use the deleteOne method instead of remove
  await Category.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});