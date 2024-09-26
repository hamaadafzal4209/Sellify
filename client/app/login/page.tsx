"use client";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation"; // to navigate after login
import axios from "axios"; // Import axios
import { server } from "@/server";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${server}/user/login`, {
        email,
        password,
      });

      const data = res.data;

      if (res.status === 200) {
        // Store the access token in cookies or local storage
        document.cookie = `access_token=${data.accessToken}; path=/;`;

        // Redirect user to the dashboard or homepage after successful login
        router.push("/");
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while logging in. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="section-heading text-center text-gray-900">
          Sign in to Sellify
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <form method="POST" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="form-input"
              />
            </div>
          </div>

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
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="form-input pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-primary-500 hover:text-[#e63b61]"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="submit-full-button">
              Sign in
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center my-8">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <span className="px-4 text-sm font-medium text-gray-500 mx-2">
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
            <span className="text-gray-600">Sign in with Google</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-primary-500 hover:text-[#e63b61]"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;