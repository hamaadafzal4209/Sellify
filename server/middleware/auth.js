import userModel from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
      return next(new ErrorHandler("UnAuthorized User", 401));
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
    req.user = await userModel.findById(decoded.id);
  
    next();
  });
