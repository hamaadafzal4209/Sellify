"use client";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios"; // For API requests
import { server } from "@/server"; // Backend server URL
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// OTP Input component
const OtpInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(""));

      if (index < length - 1 && value) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (text.length === length && /^\d+$/.test(text)) {
      const digits = text.split("");
      setOtp(digits);
      onChange(digits.join(""));
      inputsRef.current[length - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputsRef.current[index] = el)}
          maxLength="1"
          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
      ))}
    </div>
  );
};

// Main OTP verification page component
const VerifyOtpPage = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [activationToken, setActivationToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("activationToken");
    if (!token) {
      setError("No activation token found. Please try again.");
      toast.error("No activation token found.");
    } else {
      setActivationToken(token);
    }
  }, []);

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setError("Please enter the 4-digit code.");
      toast.error("Please enter the 4-digit code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${server}/user/activate-user`,
        { activation_code: otp },
        {
          headers: {
            Authorization: `Bearer ${activationToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else {
        setError("Invalid OTP. Please try again.");
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      const response = await axios.post(`${server}/user/resend-otp`, { email });

      if (response.data.success) {
        toast.success("A new OTP has been sent to your email.");
        localStorage.setItem("activationToken", response.data.activationToken);
      } else {
        setError("Failed to resend OTP. Please try again later.");
        toast.error("Failed to resend OTP. Please try again later.");
      }
    } catch (error) {
      setError("Error resending OTP.");
      toast.error("Error resending OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="max-w-md my-16 sm:mx-auto mx-4 text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Email Address Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 4-digit verification code sent to your email address:{" "}
          {email}.
        </p>
      </header>
      <form id="otp-form" onSubmit={handleSubmit}>
        <OtpInput length={4} onChange={handleOtpChange} />
        <div className="max-w-[260px] mx-auto mt-4">
          <Button
            type="submit"
            className="submit-full-button !text-sm"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Account"}
          </Button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        {"Didn't receive code?"}{" "}
        <button
          className={`font-medium text-primary-500 hover:text-primary-600 ${
            resendLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleResend}
          disabled={resendLoading}
        >
          {resendLoading ? "Resending..." : "Resend"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;