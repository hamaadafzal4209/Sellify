import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import connectDatabase from "./db/Database.js";
import dotenv from "dotenv";
import { errorHandlerMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRoutes.js";
import cloudinary from "cloudinary";
import productRouter from "./routes/productRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

// config
const app = express();
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
  
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

connectDatabase();

// import routes
app.use("/api/user/", userRouter);
app.use("/api/product/", productRouter);
app.use("/api/category/", categoryRouter);

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandled promise rejection`);
});

// Error handling middleware
app.use(errorHandlerMiddleware);

// create server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
