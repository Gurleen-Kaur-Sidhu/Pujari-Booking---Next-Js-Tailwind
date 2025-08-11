"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import api from "../lib/axios";

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    mobileNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { identifier: "", password: "" };

    if (!formData.identifier) {
      newErrors.identifier = "Email or Mobile number is required.";
      isValid = false;
    } else {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.identifier
      );
      const isValidMobile = /^\+?[0-9\s\-()]{7,20}$/.test(formData.identifier);

      if (!isValidEmail && !isValidMobile) {
        newErrors.identifier = "Enter a valid email or mobile number.";
        isValid = false;
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier);

    const payload = {
      password: formData.password,
      ...(isEmail
        ? { email: formData.identifier }
        : { mobileNumber: formData.identifier }),
    };

    try {
      const response = await api.post("/login", payload);
      const token = response.data.token;
      const role = response.data.user?.role;

      // ✅ Wait for full context login
      const success = await login(token, role);

      if (success) {
        toast.success("Login successful!");

        // ✅ Now safe to redirect
        if (role === "pujari") {
          router.push("/pujaridashboard");
        } else {
          router.push("/userdashboard");
        }
      } else {
        toast.error("Login failed: unable to fetch user profile.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message ||
        (error.request
          ? "No response from server. Please try again later."
          : "An error occurred. Please try again.");

      setLoginError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="w-full bg-[url('/images/puja44.png')] bg-cover bg-center bg-no-repeat rounded-lg p-2 sm:p-10 md:p-14">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-[var(--background)] rounded-3xl p-4 sm:p-8 md:p-10 shadow drop-shadow-[0_-1px_5px_rgba(0,0,0,0.1)]">
            <form
              onSubmit={handleLogin}
              className="w-full text-center space-y-5"
            >
              <h3 className="text-3xl font-extrabold text-[var(--text)]">
                Log In
              </h3>
              <p className="text-[var(--text)]">
                Enter your email and password
              </p>

              <a className="flex items-center justify-center font-bold gap-2 w-full py-3 text-sm transition duration-300 rounded-2xl text-[var(--brown)] hover:bg-[var(--brown)] hover:text-white border border-[var(--brown)]">
                <Image
                  src="/images/google.png"
                  alt="Google Icon"
                  width={20}
                  height={20}
                />
                Log in with Google
              </a>

              <div className="flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-4 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Email */}
              {/* Single input for Email or Mobile */}
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
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="Enter email or mobile number"
                  className="w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                />
                {errors.identifier && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.identifier}
                  </p>
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
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-9 right-3 text-[var(--brown)]"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-between items-center text-sm text-[var(--text)]">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-[var(--brown)]" />
                  <span>Keep me logged in</span>
                </label>
                <Link
                  href="/forgetpassword"
                  className="text-[var(--brown)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {loginError && (
                <div className="text-red-600 text-sm font-semibold text-center">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                onClick={() => console.log("button clicked")}
                className={`w-full py-3 text-sm font-bold text-white rounded-2xl ${
                  isLoading
                    ? "bg-[#7f1616] cursor-not-allowed"
                    : "bg-[var(--brown)] hover:bg-[#7f1616]"
                } transition`}
              >
                {isLoading ? "Logging In..." : "Log In"}
              </button>

              <p className="text-sm text-[var(--text)]">
                Not registered yet?{" "}
                <a href="/signin" className="font-bold hover:underline">
                  Create an Account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
