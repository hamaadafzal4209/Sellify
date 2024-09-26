import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { accessTokenOptions } from "../utils/jwt.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sendMail from "../utils/sendMail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Registration of user
export const registrationUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const isExistEmail = await userModel.findOne({ email });
    if (isExistEmail) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    // Prepare user data for the activation process
    const user = { name, email, password };
    const activationToken = createActivationToken(user);

    const data = {
      user: { name: user.name },
      activationCode: activationToken.activationCode,
    };

    // Render the HTML template for activation email
    const html = await ejs.renderFile(
      join(__dirname, "../mails/activation-mail.ejs"),
      data
    );

    // Send activation email
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        html,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email ${user.email} to activate your account`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(
        new ErrorHandler("Error sending activation email: " + error.message, 500)
      );
    }
  } catch (error) {
    return next(new ErrorHandler("Registration failed: " + error.message, 400));
  }
});

// Create activation token
const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { name: user.name, email: user.email, password: user.password, activationCode },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
  return { token, activationCode };
};

// Activate user account
export const activateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_code } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new ErrorHandler("Token must be provided", 400));
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Ensure the activation code matches
    if (!decodedToken.activationCode || decodedToken.activationCode !== activation_code) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, password } = decodedToken; // Get user details from token

    // Check if the user already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    // Create the new user with the details from the token
    const user = await userModel.create({ name, email, password });

    res.status(201).json({ success: true, message: "Account activated successfully!" });
  } catch (error) {
    return next(new ErrorHandler("Activation failed: " + error.message, 400));
  }
});

// Login user
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please fill all the required fields", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Wrong credentials", 401));
    }

    // Generate token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    // Send token
    res.cookie("access_token", accessToken, accessTokenOptions);

    res.status(200).json({
      success: true,
      accessToken,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("Login failed: " + error.message, 400));
  }
});

// Logout user
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.status(200).json({
      success: true,
      message: "User logged out successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler("Logout failed: " + error.message, 400));
  }
});
