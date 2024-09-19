"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

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

      // Move to next input if value is entered
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
    if (/^\d{4}$/.test(text)) {
      const digits = text.split("");
      setOtp(digits);
      onChange(digits.join(""));
      inputsRef.current[length - 1].focus();
    }
  };

  useEffect(() => {
    const handleFocus = (e) => {
      e.target.select();
    };

    inputsRef.current.forEach((input, index) => {
      input.addEventListener("focus", handleFocus);
    });

    return () => {
      inputsRef.current.forEach((input, index) => {
        input.removeEventListener("focus", handleFocus);
      });
    };
  }, [length]);

  return (
    <div className="flex items-center justify-center gap-3">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
          maxLength="1"
          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
      ))}
    </div>
  );
};

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your OTP verification logic here
    console.log("OTP Submitted:", otp);
  };

  return (
    <div className="max-w-md mt-16 sm:mx-auto mx-4 text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Email Address Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 6-digit verification code that was sent to your email
          address.
        </p>
      </header>
      <form id="otp-form" onSubmit={handleSubmit}>
        <OtpInput length={4} onChange={handleOtpChange} />
        <div className="max-w-[260px] mx-auto mt-4">
          <Button type="submit" className="submit-full-button !text-sm">
            Verify Account
          </Button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{" "}
        <a
          className="font-medium text-primary-500 hover:text-primary-600"
          href="#0"
        >
          Resend
        </a>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
