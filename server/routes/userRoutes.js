import express from "express";
import { signup, signin, google } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

export default userRouter;
