import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { accessTokenOptions } from "../utils/jwt.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sendMail from "../utils/sendMail.js";
import crypto from "crypto";

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
        new ErrorHandler(
          "Error sending activation email: " + error.message,
          500
        )
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
    {
      name: user.name,
      email: user.email,
      password: user.password,
      activationCode,
    },
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
    if (
      !decodedToken.activationCode ||
      decodedToken.activationCode !== activation_code
    ) {
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

    res
      .status(201)
      .json({ success: true, message: "Account activated successfully!" });
  } catch (error) {
    return next(new ErrorHandler("Activation failed: " + error.message, 400));
  }
});

// Resend OTP controller
export const resendOtp = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;

    // Log the incoming request to debug
    console.log("Resend OTP request body:", req.body);

    // Check if the email field is provided
    if (!email) {
      return next(new ErrorHandler("Please provide an email address", 400));
    }

    // Check if the user exists with the provided email
    const user = await userModel.findOne({ email });

    // If the user is not found, return an error
    if (!user) {
      return next(new ErrorHandler("User not found with this email", 404));
    }

    // Generate a new activation token and code
    const activationToken = createActivationToken({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const data = {
      user: { name: user.name },
      activationCode: activationToken.activationCode,
    };

    // Render the HTML template for the OTP email
    const html = await ejs.renderFile(
      join(__dirname, "../mails/activation-mail.ejs"),
      data
    );

    // Send the OTP email
    await sendMail({
      email: user.email,
      subject: "Your new OTP code",
      html,
    });

    res.status(200).json({
      success: true,
      message: `A new OTP has been sent to ${user.email}`,
      activationToken: activationToken.token,
    });
  } catch (error) {
    return next(
      new ErrorHandler("Resending OTP failed: " + error.message, 500)
    );
  }
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash the token and find the user
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  // Find the user with a valid reset token and token expiration time
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset token is invalid or expired", 400));
  }

  // Check if passwords match
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // Update the password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Send success response
  res.status(200).json({
    success: true,
    message: "Password reset successful. You can now log in with your new password.",
  });
});

// Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  // Check if the user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Generate a password reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  
  // Set expiration time for the reset token
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  const data = {
    user: { name: user.name },
    resetUrl,
  };

  // Render reset password email template
  const html = await ejs.renderFile(
    join(__dirname, "../mails/reset-password.ejs"),
    data
  );  

  console.log("HTML content for reset password email:", html);

  // Send the reset password email
  try {
    await sendMail({
      email: user.email,
      subject: "Password Reset Request",
      html,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} with password reset instructions.`,
    });
  } catch (error) {
    // Reset token fields in case of error
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    
    return next(new ErrorHandler("Error sending email: " + error.message, 500));
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

// get user
export const getUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
