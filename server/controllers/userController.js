import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import userModel from "../models/userModel.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sendMail from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Activation Token
export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" }
  );
  return { token, activationCode };
};

// User Registration
export const registrationUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const isExistEmail = await userModel.findOne({ email });

  if (isExistEmail) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  const user = { name, email, password };
  const activationToken = createActivationToken(user);
  const activationCode = activationToken.activationCode;

  const data = { user: { name: user.name }, activationCode };

  const html = await ejs.renderFile(
    path.join(__dirname, "../mails/activation-mail.ejs"),
    data
  );

  await sendMail({
    email: user.email,
    subject: "Activate your account",
    template: "activation-mail.ejs",
    data,
  });

  res.status(201).json({
    success: true,
    message: `Please check your email ${user.email} to activate your account`,
    activationToken: activationToken.token,
  });
});

// User Activation
export const activateUser = catchAsyncErrors(async (req, res, next) => {
  const { activation_token, activation_code } = req.body;

  if (!activation_token || !activation_code) {
    return next(
      new ErrorHandler("Please provide both activation token and code", 400)
    );
  }

  let newUser;
  try {
    newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired activation token", 400));
  }

  if (newUser.activationCode !== activation_code.toString()) {
    return next(new ErrorHandler("Invalid activation code", 400));
  }

  const { name, email, password } = newUser.user;
  const existUser = await userModel.findOne({ email });

  if (existUser) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  await userModel.create({ name, email, password });
  res.status(201).json({ success: true });
});

// User Login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill all the required fields", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  res.cookie("access_token", accessToken, { httpOnly: true });
  res.cookie("refresh_token", refreshToken, { httpOnly: true });

  res.status(200).json({ accessToken, refreshToken, user });
});

// User Logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});
