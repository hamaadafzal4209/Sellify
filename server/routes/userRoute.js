import express from "express";
import {
	login,
	logout,
	signup,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from '../config/multer.js';

const userRouter = express.Router();

userRouter.get("/check-auth", verifyToken, checkAuth);

userRouter.post('/signup', upload.single('avatar'), signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.post("/verify-email", verifyEmail);
userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/reset-password/:token", resetPassword);

export default userRouter;
