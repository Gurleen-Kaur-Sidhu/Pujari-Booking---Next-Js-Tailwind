"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import {
  Heart,
  LogOut,
  Lock,
  UserCog,
  LayoutDashboard,
  CreditCard,
  Calendar,
  NotebookText,
  NotebookIcon,
  LucideReceiptIndianRupee,
  Star,
} from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const itemClass = (href) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg font-medium cursor-pointer ${
      pathname === href
        ? "bg-[var(--brown)]/10 text-[var(--brown)]"
        : "text-[var(--text)]"
    } hover:bg-[var(--brown)]/10 transition`;

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 h-full">
      <div className="min-h-screen bg-[var(--card)] flex flex-col justify-between p-6">
        {/* Top: Profile + Menu */}
        <div>
          {/* Profile */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full border border-[#ccc] mx-auto overflow-hidden">
              <img
                src={
                  user?.profileImage
                    ? `https://pujari-app-backend-production.up.railway.app/uploads/${user.profileImage}`
                    : "/images/5856.jpg"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-3 font-bold text-lg text-[var(--text)]">
              {user?.fullName || "Loading..."}
            </h3>
            <p className="text-sm text-[var(--text)]/70">{user?.email || ""}</p>
          </div>

          {/* Navigation Menu */}
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/pujaridashboard"
                className={itemClass("/pujaridashboard")}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/pujaridashboard/booking"
                className={itemClass("/pujaridashboard/booking")}
              >
                <Calendar size={18} /> Bookings
              </Link>
            </li>
            <li>
              <Link
                href="/pujaridashboard/schedule"
                className={itemClass("/pujaridashboard/schedule")}
              >
                <NotebookText size={18} /> Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/pujaridashboard/availability"
                className={itemClass("/pujaridashboard/availability")}
              >
                <NotebookIcon size={18} /> Manage Availability
              </Link>
            </li>
            <li>
              <Link
                href="/pujaridashboard/transactions"
                className={itemClass("/pujaridashboard/transactions")}
              >
                <CreditCard size={18} /> Transactions
              </Link>
            </li>
            <li>
              <Link
                href="/pujaridashboard/bankdetails"
                className={itemClass("/pujaridashboard/bankdetails")}
              >
                <Lock size={18} /> Bank Details
              </Link>
            </li>
            <li>
              <Link
                href="/pujaridashboard/earnings"
                className={itemClass("/pujaridashboard/earnings")}
              >
                <LucideReceiptIndianRupee size={18} /> Manage Earning
              </Link>
            </li>
            <li>
              <Link
                href="/pujaridashboard/reviews"
                className={itemClass("/pujaridashboard/reviews")}
              >
                <Star size={18} /> Manage Review
              </Link>
            </li>
            <li>
              <Link
                href="/pujaridashboard/profile"
                className={itemClass("/pujaridashboard/profile")}
              >
                <UserCog size={18} /> Edit Profile
              </Link>
            </li>
            <li>
              <Link
                href="/pujaridashboard/changepassword"
                className={itemClass("/pujaridashboard/changepassword")}
              >
                <Lock size={18} /> Change Password
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom: Logout */}
        <div className="mt-6">
          <ul className="text-sm">
            <li className={itemClass("/logout")}>
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
