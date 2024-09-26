"use client"

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { server } from "@/server";

// Zod schema for form validation
const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password is required" }),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Initialize react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Updated registration function
  const onSubmit = async (data:any) => {
    try {
      const response = await axios.post(`${server}/user/registration`, {
        name: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Store activation token if needed
        localStorage.setItem("activationToken", response.data.activationToken);
        // Redirect to verify-otp page
        router.push("/verify-otp");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="section-heading text-center text-gray-900">
          Sign Up for Sellify
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                type="text"
                {...register("username")}
                className="form-input"
              />
              {errors.username && (
                <p className="text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                {...register("email")}
                className="form-input"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="form-input pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mt-4 relative">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="form-input pr-10"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary-500 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                {...register("terms")}
                className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <Link
                  href=""
                  className="text-primary-500 hover:text-primary-600"
                >
                  terms and conditions
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="submit-full-button">
              Sign Up
            </button>
          </div>
        </form>

        {/* Google Sign Up Button */}
        <div className="relative flex items-center justify-center my-8">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <span className="px-4 text-sm font-medium text-gray-500 bg-white mx-2">
            or
          </span>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

        <div className="mt-6">
          <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold leading-6 text-gray-600 shadow-sm hover:bg-gray-50 transition-all duration-200">
            <Image
              width={20}
              height={20}
              src="/assets/google.png"
              alt="Google Icon"
              className="mr-3 h-5 w-5 object-contain"
            />
            <span className="text-gray-600">Sign up with Google</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-primary-500 hover:text-primary-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;  