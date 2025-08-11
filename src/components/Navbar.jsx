"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const { isAuthenticated, logout, loading, userRole } = useAuth();
  const router = useRouter();

  if (loading) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-[var(--card)] shadow-md py-4 px-6 lg:px-20 relative">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-[var(--brown)] font-extrabold text-xl tracking-tight"
        >
          BookMyPuja
        </Link>

        {/* Desktop Menu */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-12 text-[var(--text)] font-semibold">
          <Link href="/" className="hover:text-[var(--brown)] transition">
            Home
          </Link>
          <Link href="/book" className="hover:text-[var(--brown)] transition">
            Book A Pujari
          </Link>
          <Link
            href="/service"
            className="hover:text-[var(--brown)] transition"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="hover:text-[var(--brown)] transition"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex gap-4">
              <Link
  href={userRole === "pujari" ? "/pujaridashboard" : "/userdashboard"}
>
                <img
                  src="/images/5856.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-[var(--brown)] cursor-pointer"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 text-sm font-bold bg-[var(--brown)] text-white w-10 h-10 rounded-full"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="custom-button"
                >
                  Sign Up
                  <ChevronDown size={18} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-[var(--card)] border border-gray-300 rounded shadow-lg z-50 w-40">
                    <div onClick={() => setIsDropdownOpen(false)}>
                      <Link
                        href="/signin/pujari"
                        className="block px-4 py-2 text-[var(--text)] hover:text-[var(--brown)]"
                      >
                        As Pujari
                      </Link>
                    </div>
                    <div onClick={() => setIsDropdownOpen(false)}>
                      <Link
                        href="/signin/user"
                        className="block px-4 py-2 text-[var(--text)] hover:text-[var(--brown)]"
                      >
                        As User
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/login">
                <button className="custom-button">Login</button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 border border-[var(--brown)] text-[var(--brown)] rounded"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--card)] z-50 shadow-md p-6 flex flex-col space-y-4 text-[var(--text)] font-semibold">
          <Link href="/" className="hover:text-[var(--brown)]">
            Home
          </Link>
          <Link href="/book" className="hover:text-[var(--brown)]">
            Book A Pujari
          </Link>
          <Link href="/service" className="hover:text-[var(--brown)]">
            Services
          </Link>
          <Link href="/contact" className="hover:text-[var(--brown)]">
            Contact
          </Link>

          {!isAuthenticated ? (
            <>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center cursor-pointer gap-2 text-white font-bold bg-[var(--brown)] py-2 px-4 rounded-full"
                >
                  Sign Up
                  <ChevronDown size={18} />
                </button>
                {isDropdownOpen && (
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/signin?role=pujari"
                      className="text-[var(--brown)] hover:underline"
                    >
                      As Pujari
                    </Link>
                    <Link
                      href="/signin?role=user"
                      className="text-[var(--brown)] hover:underline"
                    >
                      As User
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/login">
                <button className="text-sm font-bold bg-[var(--brown)] text-white py-2 px-5 rounded-full">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm font-bold bg-[var(--brown)] text-white py-2 px-5 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
