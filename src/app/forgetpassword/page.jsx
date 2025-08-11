"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import api from "../lib/axios";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = (value) => /^\+?[0-9\s\-()]{7,20}$/.test(value);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setOtpError("");
    setSubmitted(false);

    if (!identifier) {
      setError("Email or Mobile Number is required.");
      return;
    }

    let payload = {};
    if (isEmail(identifier)) payload.email = identifier;
    else if (isPhone(identifier)) payload.mobileNumber = identifier;
    else {
      setError("Enter a valid email or 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/forget-password", payload);
      toast.success("OTP sent successfully!");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (!otp || otp.length < 4) {
      setOtpError("Please enter a valid OTP.");
      return;
    }

    let payload = {};
    if (isEmail(identifier)) payload.email = identifier;
    else payload.mobileNumber = identifier;
    payload.otp = otp;

    try {
      const res = await api.post("/verify-otp", payload);
      if (res.data?.message?.toLowerCase().includes("otp verified")) {
        setOtpVerified(true);
        setOtpError("");
        toast.success("OTP Verified Successfully!");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setOtpError(err.response?.data?.message || "Invalid OTP. Try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePasswordForm = () => {
    const { password, confirmPassword } = formData;
    const newErrors = {};

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Minimum 6 characters.";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password.";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validatePasswordForm()) return;

    const payload = {
      ...formData,
      ...(isEmail(identifier) ? { email: identifier } : { mobileNumber: identifier }),
    };

    try {
      setLoading(true);
      const res = await api.post("/reset-password", payload);
      toast.success("Password reset successful!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/puja44.png')] bg-cover bg-bottom bg-no-repeat">
      <div className="w-full rounded-lg p-2 sm:p-10 md:p-14">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-[var(--background)] rounded-3xl p-6 sm:p-8 md:p-10 shadow drop-shadow-[0_-1px_5px_rgba(0,0,0,0.1)]">
            {!submitted ? (
              <form onSubmit={handleSendOtp} className="text-center space-y-5">
                <h2 className="text-3xl font-extrabold text-[var(--text)]">
                  Forgot Password
                </h2>
                <p className="text-[var(--text)] text-sm">
                  Enter your registered email or mobile to receive an OTP.
                </p>

                <div className="text-left">
                  <label
                    htmlFor="identifier"
                    className="block mb-1 text-sm font-bold text-[var(--text)]"
                  >
                    Email or Mobile Number*
                  </label>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter email or mobile number"
                    className="w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                  />
                  {error && (
                    <p className="text-red-600 text-xs mt-1">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-sm font-bold text-white rounded-2xl bg-[var(--brown)] hover:bg-[#7f1616] transition"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>

                <p className="text-sm text-[var(--text)]">
                  Remember your password?{" "}
                  <a
                    href="/login"
                    className="font-bold text-[var(--brown)] hover:underline"
                  >
                    Back to Login
                  </a>
                </p>
              </form>
            ) : !otpVerified ? (
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-extrabold mb-2">Verify OTP</h3>
                <p className="text-sm text-[var(--text)]">
                  Enter the OTP sent to your{" "}
                  <span className="font-semibold">
                    {isEmail(identifier) ? "email" : "mobile"}
                  </span>.
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  placeholder="Enter OTP"
                  className="w-full mt-2 px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-center text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                />

                {otpError && (
                  <p className="text-red-600 text-xs mt-1">{otpError}</p>
                )}

                <p
                  onClick={handleSendOtp}
                  className="text-sm mt-2 text-[var(--brown)] cursor-pointer hover:underline"
                >
                  Resend OTP
                </p>

                <button
                  onClick={handleOtpVerify}
                  className="w-full mt-4 py-3 text-sm font-bold text-white rounded-2xl bg-[var(--brown)] hover:bg-[#7f1616] transition"
                >
                  Verify OTP
                </button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-extrabold mb-2">Reset Password</h3>
                <p className="text-sm text-[var(--text)]">Enter your new password.</p>

                {/* Password */}
                <div className="text-left relative">
                  <label className="block mb-1 text-sm font-bold text-[var(--text)]">
                    New Password*
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 pr-10 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-9 right-3 text-[var(--brown)]"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="text-left relative">
                  <label className="block mb-1 text-sm font-bold text-[var(--text)]">
                    Confirm Password*
                  </label>
                  <input
                    type={showconfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 pr-10 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowconfirmPassword((prev) => !prev)}
                    className="absolute top-9 right-3 text-[var(--brown)]"
                  >
                    {showconfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleResetPassword}
                  className="w-full mt-4 py-3 text-sm font-bold text-white rounded-2xl bg-[var(--brown)] hover:bg-[#7f1616] transition"
                >
                  Reset Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
