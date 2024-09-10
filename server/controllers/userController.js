import catchAsyncErrors from "../middleware/catchAsyncErrors";
import userModel from "../models/userModel";
import ejs from 'ejs';
import path from 'path';
import sendMail from "../utils/sendMail";

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

    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/activation-mail.ejs"),
      data
    );

    try {
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
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  
    const token = jwt.sign(
      { user, activationCode },
      process.env.ACTIVATION_SECRET,
      { expiresIn: "5m" }
    );
  
    return { token, activationCode };
  };

  export const activateUser = catchAsyncErrors(
    async (req, res, next) => {
      try {
        const { activation_token, activation_code } = req.body;
  
        const newUser = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
  
        if (newUser.activationCode !== activation_code) {
          return next(new ErrorHandler("Invalid activation code", 400));
        }
  
        const { name, email, password } = newUser.user;
  
        const existUser = await userModel.findOne({ email });
  
        if (existUser) {
          return next(new ErrorHandler("Email already exists", 400));
        }
  
        const user = await userModel.create({
          name,
          email,
          password,
        });
  
        res.status(201).json({
          success: true,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );

// login user
  export const loginUser = catchAsyncErrors(
    async (req, res, next) => {
      try {
        const { email, password } = req.body;
  
        if (email === "" || password === "") {
          return next(
            new ErrorHandler("Please fill all the required fields", 404)
          );
        }
  
        const user = await userModel.findOne({ email }).select("+password");
  
        if (!user) {
          return next(new ErrorHandler("User not found", 400));
        }
  
        const isPasswordMatch = await user.comparePassword(password);
  
        if (!isPasswordMatch) {
          return next(new ErrorHandler("Wrong Credentials", 400));
        }
  
        // Generate tokens
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN , { expiresIn: "5m" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN , { expiresIn: "7d" });
  
        // Send tokens
        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);
  
        res.status(200).json({
          accessToken,
          refreshToken,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );

  // logout user
export const logoutUser = catchAsyncErrors(
    async (req, res, next) => {
      try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
  
        const userId = req.user._id || "";
  
        redis.del(userId);
  
        res.status(200).json({
          success: true,
          message: "User Loggout Successfully!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );