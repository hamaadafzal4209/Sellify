import express from 'express'
import { createNewProduct } from '../controllers/productController.js';
const productRouter = express.Router();

productRouter.post("/create-product", createNewProduct)

export default productRouter;