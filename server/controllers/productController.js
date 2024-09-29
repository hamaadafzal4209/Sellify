import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ProductModel from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

export const createNewProduct = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    images,
    features,
  } = req.body;

  try {
    // Validate if images are provided
    if (!images || images.length === 0) {
      return next(new ErrorHandler("Please upload at least one image", 400));
    }

    // Upload images to Cloudinary and get URLs
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const { path } = image;
        const result = await cloudinary.uploader.upload(path, {
          folder: "products",
        });
        return {
          public_url: result.secure_url,
          url: result.secure_url,
        };
      })
    );

    // Create a new product
    const newProduct = await ProductModel.create({
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images: uploadedImages,
      features,
    });

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message || "Failed to create product", 500)
    );
  }
});
