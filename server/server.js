import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import connectDatabase from "./db/Database.js";
import dotenv from "dotenv";
import { errorHandlerMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRoute.js";

// config
const app = express();

dotenv.config({
  path: "./server/config/.env",
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

connectDatabase();

// import routes

app.use("/api/v1/user", userRouter);

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
