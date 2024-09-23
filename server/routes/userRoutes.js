import express from "express";
import {
  activateUser,
  loginUser,
  registrationUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);

export default userRouter;
