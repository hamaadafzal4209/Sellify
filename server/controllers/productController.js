import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ProductModel from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

// create new product
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

  // Log incoming request data for debugging
  console.log("Received data:", req.body);

  try {
    // Validate if images are provided
    if (!images || images.length === 0) {
      console.error("No images provided");
      return next(new ErrorHandler("Please upload at least one image", 400));
    }

    // Upload images to Cloudinary and get URLs
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const { path } = image;

        // console.log("Uploading image:", path);

        try {
          const result = await cloudinary.uploader.upload(path, {
            folder: "products",
          });
          //   console.log("Uploaded image result:", result);
          return {
            public_url: result.secure_url,
            url: result.secure_url,
          };
        } catch (uploadError) {
          //   console.error("Error uploading image to Cloudinary:", uploadError);
          return next(new ErrorHandler("Error uploading image", 500));
        }
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

    console.log("Product created successfully:", newProduct);

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    // console.error("Error in createNewProduct:", error);
    return next(
      new ErrorHandler(error.message || "Internal Server Error", 500)
    );
  }
});
