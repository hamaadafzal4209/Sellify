import express from 'express'
import { allProducts, createNewProduct } from '../controllers/productController.js';
const productRouter = express.Router();

productRouter.post("/create-product", createNewProduct)
productRouter.get("/get-all-products", allProducts)

export default productRouter;