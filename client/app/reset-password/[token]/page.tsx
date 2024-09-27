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
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;