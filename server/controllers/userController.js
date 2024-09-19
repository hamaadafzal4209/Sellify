import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(401, "All fields are required!"));
  }

  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    next(errorHandler(401, "Email already in use!"));
  }

  const checkusername = await userModel.findOne({ username });
  if (checkusername) {
    next(errorHandler(401, "Username already in use!"));
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    await user.save();

    res.json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(401, "All fields are required!"));
  }

  try {
    const validUser = await userModel.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(404, "Invalid password!"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    const { password: pass, ...rest } = validUser._doc; // remove password from the object

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);

    res.status(200).json("Login succesful!");
  } catch (error) {
    next(errorHandler({ message: error.message }));
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY
      );
      const { password, ...rest } = user._doc; // remove password from the object
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new userModel({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_KEY
      );
      const { password, ...rest } = newUser._doc; // remove password from the object
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    console.error("Google OAuth error: ", error);
    next(error);
  }
};
