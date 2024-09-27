"use client"; // Ensure this is at the very top

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "@/server";

const ResetPassword = () => {
  const router = useRouter();
  const { query } = router;
  const token = query?.token; // Use optional chaining to avoid destructuring error

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (query?.token) {
      setToken(query.token);
    }
  }, [query]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

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
      setErrorMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="flex min-h-[70vh] flex-1 flex-col px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="section-heading text-center text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleResetPassword}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

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