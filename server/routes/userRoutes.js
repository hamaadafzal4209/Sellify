import express from "express";
import {
  activateUser,
  getUser,
  loginUser,
  logoutUser,
  registrationUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/getuser", isAuthenticated, getUser);
userRouter.get("/logout", isAuthenticated,logoutUser);

export default userRouter;
