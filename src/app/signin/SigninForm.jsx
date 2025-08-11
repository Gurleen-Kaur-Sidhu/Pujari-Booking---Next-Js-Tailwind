"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { useRouter } from "next/navigation";
const SigninForm = ({ role = "user" }) => {
  const userType = role === "pujari" ? "pujari" : "user";

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { fullName, mobileNumber, email, password, confirmPassword } =
      formData;

    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required.";
    else if (!/^\+?[0-9\s\-()]{7,20}$/.test(mobileNumber))
      newErrors.mobileNumber = "Enter a valid phone number.";

    if (!email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (password.trim() !== confirmPassword.trim()) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    const termsAccepted = document.getElementById("terms")?.checked;
    if (!termsAccepted)
      newErrors.terms = "You must agree to the Terms & Conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await api.post("/create-account", {
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: userType,
      });

      console.log("Signup successful:", response.data);
      setFormError("");
      toast.success("Signup successful! Please verify your OTP.");
      setShowOtp(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      console.error("Signup failed:", errorMessage);
      setFormError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async () => {
  if (!otp || otp.length !== 6) {
    setOtpError("Please enter a valid 6-digit OTP.");
    return;
  }

  try {
    const res = await api.post("/verify-otp", {
      email: formData.email,
      otp,
    });

    if (res.data.success) {
      toast.success("✅ OTP Verified! Signup complete.");
      router.push("/login");
    } else {
      setOtpError(res.data.message || "Invalid OTP. Please try again.");
    }
  } catch (err) {
    console.error("OTP verification failed:", err);
    setOtpError(
      err.response?.data?.message || "OTP verification failed. Try again."
    );
  }
};


  return (
    <div className="bg-[var(--background)] flex items-center justify-center bg-[url('/images/puja44.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-full rounded-lg p-2 sm:p-10 md:p-14">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-[var(--background)] rounded-3xl p-4 sm:p-8 md:p-10 shadow drop-shadow-[0_-1px_5px_rgba(0,0,0,0.1)]">
            {!showOtp ? (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="w-full text-center space-y-5"
              >
                <h3 className="text-3xl font-extrabold text-[var(--text)]">
                  {userType === "pujari" ? "Pujari" : "User"} Sign Up
                </h3>

                <p className="text-[var(--text)]">Enter your details below</p>

                <a className="flex items-center justify-center font-bold gap-2 w-full py-3 text-sm transition duration-300 rounded-2xl text-[var(--brown)] hover:bg-[var(--brown)] hover:text-white border border-[var(--brown)]">
                  <Image
                    src="/images/google.png"
                    alt="Google Icon"
                    width={20}
                    height={20}
                  />
                  Sign Up with Google
                </a>

                <div className="flex items-center">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-4 text-gray-500">or</span>
                  <hr className="flex-grow border-gray-300" />
                </div>

                {/* Full Name */}
                <div className="text-left">
                  <label
                    htmlFor="fullName"
                    className="block mb-1 text-sm font-bold text-[var(--text)]"
                  >
                    Full Name*
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="text-left">
                  <label
                    htmlFor="mobile"
                    className="block mb-1 text-sm font-bold text-[var(--text)]"
                  >
                    Mobile Number*
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    className="w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="text-left">
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-bold text-[var(--text)]"
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mail@example.com"
                    className="w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="text-left relative">
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-bold text-[var(--text)]"
                  >
                    Password*
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter a password"
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
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-bold text-[var(--text)]"
                  >
                    Confirm Password*
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showconfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-3 pr-10 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowconfirmPassword((prev) => !prev)}
                    className="absolute top-9 right-3 text-[var(--brown)]"
                  >
                    {showconfirmPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex text-sm text-[var(--text)]">
                  <label className="flex items-start gap-2">
                    <input
                      id="terms"
                      type="checkbox"
                      className="accent-[var(--brown)] mt-1"
                    />
                    <span>
                      I acknowledge and agree to the{" "}
                      <span className="underline cursor-pointer">
                        Terms & Conditions
                      </span>
                      .
                    </span>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-600 text-xs mt-1">{errors.terms}</p>
                )}

                {formError && (
                  <div className="text-red-600 text-sm font-semibold text-center">
                    {formError}
                  </div>
                )}

                {/* <button
                  type="submit"
                  onClick={() => console.log("🧪 Button clicked")}
                  className="w-full py-3 text-sm font-bold text-white rounded-2xl bg-[var(--brown)] hover:bg-[#7f1616] transition"
                >
                  Sign Up
                </button> */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 text-sm font-bold text-white rounded-2xl ${
                    isLoading
                      ? "bg-[#7f1616] cursor-not-allowed"
                      : "bg-[var(--brown)] hover:bg-[#7f1616]"
                  } transition`}
                >
                  {isLoading ? "Sigining Up..." : "Sign Up"}
                </button>

                <p className="text-sm text-[var(--text)]">
                  Have an account?{" "}
                  <a href="/login" className="font-bold hover:underline">
                    Login Here
                  </a>
                </p>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="justify-center">
                  {/* Mobile Verification */}
                  <div className="">
                    <h3 className="text-3xl font-extrabold mb-3">
                      Verification
                    </h3>
                    <p className="text-sm my-1">
                      {/* We sent an SMS with a 4-digit code to your +91-{formData.mobile}.<br /> */}
                      We sent an SMS with a 6-digit code to your mobile and
                      verification link to your email. Please enter it so we can
                      be sure that this number and email belongs to you
                    </p>

                    <h3 className="text-lg font-bold text-left mt-6 mb-0">
                      Mobile/Email Verification:
                    </h3>

                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      placeholder="Enter OTP"
                      className="w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-center text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                    />

                    {otpError && (
                      <p className="text-red-600 text-xs mt-1">{otpError}</p>
                    )}

                    <p className="text-sm mt-2 text-[var(--brown)] cursor-pointer hover:underline">
                      Resend OTP
                    </p>

                    <button
                      onClick={handleOtpVerify}
                      className="w-full mt-8 py-3 text-sm font-bold text-white rounded-2xl bg-[var(--brown)] hover:bg-[#7f1616] transition"
                    >
                      VERIFY
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
