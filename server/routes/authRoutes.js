import express from 'express';
import {
  register,
  login,
  sendOtp,
  verifyOtp,
  recoverPassword,
  resetPassword,
} from '../controllers/authController.js';

const router = express.Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// Send OTP route
router.post('/send-otp', sendOtp);

// Verify OTP route
router.post('/verify-otp', verifyOtp);

// Recover password route
router.post('/recover-password', recoverPassword);

// Reset password route
router.post('/reset-password', resetPassword);

export default router;
