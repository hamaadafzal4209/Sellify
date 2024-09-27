"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "@/server"; // Adjust the import based on your project structure

const ResetPassword = () => {
  const router = useRouter();
  const { query } = router;
  const token = query?.token; // Use optional chaining to avoid destructuring an undefined object

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid or missing token");
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${server}/user/reset-password`, {
        token,
        password,
        confirmPassword,
      });
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-full sm:min-h-[70vh] flex-1 flex-col px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="section-heading text-center text-gray-900">Reset Password</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              New Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}

          <div className="mt-6">
            <button type="submit" className="submit-full-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;