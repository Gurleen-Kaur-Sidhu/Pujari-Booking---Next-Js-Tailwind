"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Lock,
  UserCog,
  LayoutDashboard,
  ShieldCheck,
  User,
  BookUpIcon,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

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
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto bg-[url('/images/5856.jpg')] bg-cover bg-center" />
            <h3 className="mt-3 font-bold text-lg text-[var(--text)]">Harsh Vyas</h3>
            <p className="text-sm text-[var(--text)]/70">harsh@gmail.com</p>
          </div>

          {/* Navigation Menu */}
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/superadmin" className={itemClass("/superadmin")}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/superadmin/manageusers"
                className={itemClass("/superadmin/manageusers")}
              >
                <User size={18} /> Manage Users
              </Link>
            </li>
            <li>
              <Link
                href="/superadmin/managepujari"
                className={itemClass("/superadmin/managepujari")}
              >
                <ShieldCheck size={18} /> Manage Pujari
              </Link>
            </li>
            <li>
              <Link
                href="/superadmin/bookings"
                className={itemClass("/superadmin/bookings")}
              >
                <BookUpIcon size={18} /> Manage Booking
              </Link>
            </li>
            <li>
              <Link
                href="/superadmin/profile"
                className={itemClass("/superadmin/profile")}
              >
                <UserCog size={18} /> Edit Profile
              </Link>
            </li>
            <li>
              <Link
                href="/superadmin/changepassword"
                className={itemClass("/superadmin/changepassword")}
              >
                <Lock size={18} /> Change Password
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom: Logout */}
        <div className="mt-6">
          <ul className="text-sm">
            <li className="text-[var(--text)] hover:text-[var(--brown)] cursor-pointer flex gap-3 items-center">
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
