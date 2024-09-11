"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Manage the state of each OTP input
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Create refs for the inputs

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^[0-9]{1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 3) {
        inputRefs.current[index + 1]?.focus(); // Move to the next input
      }
    }
  };

  // Handle keydown for backspace and delete
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (/^[0-9]{4}$/.test(text)) {
      const digits = text.split("");
      setOtp(digits);
      inputRefs.current[3]?.focus(); // Focus the last input after pasting
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`OTP Submitted: ${otp.join("")}`);
  };

  return (
    <div className="mt-20">
      <div
        className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-md"
      >
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Verify Email</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 4-digit verification code that was sent to your email.
          </p>
        </header>
        <form id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength={1}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref to the input
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-darkPrimary focus:outline-none focus:ring focus:ring-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-primary transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">
          {"Have an account? "}
          <Link
            className="text-primary hover:text-darkPrimary font-semibold"
            href="/login"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
