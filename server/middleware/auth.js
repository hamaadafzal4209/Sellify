import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import userModel from "../models/userModel.js";
import catchAsyncErrors from "./catchAsyncErrors.js";

// Authenticated users
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return next(new ErrorHandler("Please log in", 401));
  }

  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  req.user = user;
  next();
});

// Authorize user role
export const authorizeRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return next(new ErrorHandler(`Role: ${req.user.role} not allowed`, 403));
  }
  next();
};
