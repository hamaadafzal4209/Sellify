import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your product name!"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter your product description!"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Please enter your product category!"],
    },
    tags: {
      type: [String],
      default: [],
    },
    originalPrice: {
      type: Number,
      required: [true, "Please enter the original price of the product!"],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Original price must be a positive number",
      },
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter the discount price of the product!"],
      validate: {
        validator: function (value) {
          return value <= this.originalPrice;
        },
        message:
          "Discount price should be less than or equal to original price",
      },
    },
    stock: {
      type: Number,
      required: [true, "Please enter the stock quantity!"],
      min: [0, "Stock cannot be negative"],
      default: 1,
    },
    images: [
      {
        public_url: {
          type: String,
          required: [true, "Please enter the image public URL!"],
        },
        url: {
          type: String,
          required: [true, "Please enter the image URL!"],
        },
      },
    ],
    features: {
      type: [String],
      default: [],
      required: [true, "Please add product features!"],
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: [true, "Please add a rating between 1 and 5"],
        },
        comment: {
          type: String,
          required: [true, "Please enter your review comment"],
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    sold_out: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
