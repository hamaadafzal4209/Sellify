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

export const registrationUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isExistEmail = await userModel.findOne({ email });

    if (isExistEmail) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const user = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    // Render the HTML template
    const html = await ejs.renderFile(
      join(__dirname, "../mails/activation-mail.ejs"),
      data
    );

    try {
      // Send the rendered HTML as the email body
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        html, // Use the rendered HTML here
      });

      res.status(201).json({
        success: true,
        message: `Please check your email ${user.email} to activate your account`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};

// activate user controller
export const activateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token, activation_code } = req.body;

    // Verify the token
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    console.log("Decoded User:", newUser); // Log the decoded user info

    // Compare the activation code
    if (newUser.activationCode !== activation_code) {
      console.log(`Provided Code: ${activation_code}, Expected Code: ${newUser.activationCode}`); // Log both codes
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    // Proceed with creating the user
    const { name, email, password } = newUser.user;
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const user = await userModel.create({ name, email, password });

    res.status(201).json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// login user controller
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      return next(new ErrorHandler("Please fill all the required fields", 404));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Wrong Credentials", 400));
    }

    // Generate token
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    // Send token
    res.cookie("access_token", accessToken, accessTokenOptions);

    res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
