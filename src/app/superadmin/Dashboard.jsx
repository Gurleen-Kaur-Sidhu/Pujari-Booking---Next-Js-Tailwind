"use client";
import React from "react";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, UserCheck, CalendarDays } from "lucide-react";

// Monthly data (static)
const monthlyStats = [
  { month: "Jan", users: 10, pujaris: 2 },
  { month: "Feb", users: 20, pujaris: 4 },
  { month: "Mar", users: 25, pujaris: 6 },
  { month: "Apr", users: 30, pujaris: 8 },
  { month: "May", users: 40, pujaris: 10 },
  { month: "Jun", users: 45, pujaris: 13 },
  { month: "Jul", users: 50, pujaris: 15 },
  { month: "Aug", users: 25, pujaris: 6 },
  { month: "Sep", users: 30, pujaris: 8 },
  { month: "Oct", users: 40, pujaris: 10 },
  { month: "Nov", users: 45, pujaris: 13 },
  { month: "Dec", users: 50, pujaris: 15 },
];

// Totals (static)
const totalUsers = 410;
const totalPujaris = 120;
const totalBookings = 128;

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[var(--card)] p-6">
      <h2 className="text-2xl font-bold text-[var(--brown)] mb-6">Welcome, Admin 👋</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {/* Users */}
        <div className="bg-gradient-to-r from-[#fff9ed] to-[#fcecd4] shadow-md rounded-xl p-5 flex items-center gap-4 transition hover:shadow-lg">
          <Users className="text-[var(--brown)] w-10 h-10" />
          <div>
            <p className="text-md font-semibold text-[var(--text)]">Total Users</p>
            <p className="text-xl font-semibold text-[var(--brown)]">
              <CountUp end={totalUsers} duration={1.5} />
            </p>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </div>
        </div>

        {/* Pujaris */}
        <div className="bg-gradient-to-r from-[#fff9ed] to-[#fcecd4] shadow-md rounded-xl p-5 flex items-center gap-4 transition hover:shadow-lg">
          <UserCheck className="text-[var(--brown)] w-10 h-10" />
          <div>
            <p className="text-md font-semibold text-[var(--text)]">Total Pujaris</p>
            <p className="text-xl font-semibold text-[var(--brown)]">
              <CountUp end={totalPujaris} duration={1.5} />
            </p>
            <p className="text-xs text-orange-600 mt-1">+8% from last month</p>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-gradient-to-r from-[#fff9ed] to-[#fcecd4] shadow-md rounded-xl p-5 flex items-center gap-4 transition hover:shadow-lg">
          <CalendarDays className="text-[var(--brown)] w-10 h-10" />
          <div>
            <p className="text-md font-semibold text-[var(--text)]">Total Bookings</p>
            <p className="text-xl font-semibold text-[var(--brown)]">
              <CountUp end={totalBookings} duration={1.5} />
            </p>
            <p className="text-xs text-blue-600 mt-1">+18% from last month</p>
          </div>
        </div>
      </div>

      {/* Monthly Registration Chart */}
      <div className="bg-[var(--background)] p-4 rounded-xl shadow-sm w-full">
        <h3 className="text-lg font-semibold text-[var(--brown)] mb-2">Monthly Registrations (2025)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyStats} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Users"
            />
            <Line
              type="monotone"
              dataKey="pujaris"
              stroke="#f97316"
              strokeWidth={2}
              name="Pujaris"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
