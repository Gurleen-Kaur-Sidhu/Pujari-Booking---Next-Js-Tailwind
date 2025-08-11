"use client";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  Heart,
  CreditCard,
  UserCog,
} from "lucide-react";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path) => pathname === path;

  const itemClass = (active) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg font-medium cursor-pointer ${
      active ? "bg-[var(--brown)]/10 text-[var(--brown)]" : "text-[var(--text)]"
    } hover:bg-[var(--brown)]/10 transition`;

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 h-full">
      <div className="min-h-screen bg-[var(--card)] flex flex-col justify-between p-6">
        <div>
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

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/userdashboard"
                className={itemClass(isActive("/userdashboard"))}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/userdashboard/favourites"
                className={itemClass(isActive("/userdashboard/favourites"))}
              >
                <Heart size={18} /> Favourites
              </Link>
            </li>
            <li>
              <Link
                href="/userdashboard/transactions"
                className={itemClass(isActive("/userdashboard/transactions"))}
              >
                <CreditCard size={18} /> Transactions
              </Link>
            </li>
            <li>
              <Link
                href="/userdashboard/profile"
                className={itemClass(isActive("/userdashboard/profile"))}
              >
                <UserCog size={18} /> Edit Profile
              </Link>
            </li>
            <li>
              <Link
                href="/userdashboard/changepassword"
                className={itemClass(isActive("/userdashboard/changepassword"))}
              >
                <Lock size={18} /> Change Password
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <ul className="text-sm">
            <li className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium cursor-pointer text-[var(--text)] hover:bg-[var(--brown)]/10 transition">
              <LogOut size={18} /> Logout
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
