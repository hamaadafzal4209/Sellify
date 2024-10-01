const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: [
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
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
