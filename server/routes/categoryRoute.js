import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/create-category", createCategory);
categoryRouter.get("/get-all-categories", getAllCategories);
categoryRouter.put("/update-category/:id", updateCategory);
categoryRouter.delete("/delete-category/:id", deleteCategory);

export default categoryRouter;
