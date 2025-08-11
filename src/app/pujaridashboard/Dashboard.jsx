"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import {
  CalendarCheck,
  CalendarClock,
  IndianRupee,
  Wallet,
  ArrowDownToLine,
  ArrowUpRight,
} from "lucide-react";

// Initial bookings data
const initialBookings = [
  {
    bookingId: "#BK1001",
    date: "2025-07-01",
    clientName: "Rahul Sharma",
    service: "Griha Pravesh",
    location: "Amritsar",
    status: "Pending",
  },
  {
    bookingId: "#BK1002",
    date: "2025-07-02",
    clientName: "Sneha Patel",
    service: "Satyanarayan Katha",
    location: "Ludhiana",
    status: "Pending",
  },
  {
    bookingId: "#BK1003",
    date: "2025-06-28",
    clientName: "Amit Verma",
    service: "Wedding",
    location: "Bathinda",
    status: "Pending",
  },
  {
    bookingId: "#BK1004",
    date: "2025-06-27",
    clientName: "Priya Desai",
    service: "Mundan Ceremony",
    location: "Chandigarh",
    status: "Pending",
  },
];

const statsData = [
  {
    label: "Total Puja Bookings",
    value: 24,
    icon: <CalendarCheck className="text-[var(--brown)] w-7 h-7" />,
    progress: 40,
  },
  {
    label: "Total Event Bookings",
    value: 16,
    icon: <CalendarClock className="text-[var(--brown)] w-7 h-7" />,
    progress: 60,
  },
  {
    label: "Total Earnings",
    value: "₹12,000",
    icon: <IndianRupee className="text-[var(--brown)] w-7 h-7" />,
    progress: 70,
  },
  {
    label: "Earnings This Month",
    value: "₹2,000",
    icon: <Wallet className="text-[var(--brown)] w-7 h-7" />,
    progress: 55,
  },
  {
    label: "Withdrawable Balance",
    value: "₹5,000",
    icon: <ArrowDownToLine className="text-[var(--brown)] w-7 h-7" />,
    progress: 50,
  },
  {
    label: "Total Withdrawal Amount",
    value: "₹7,000",
    icon: <ArrowUpRight className="text-[var(--brown)] w-7 h-7" />,
    progress: 65,
  },
];

export default function PujariBookingsDashboard() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter bookings by search term
  const filteredBookings = bookings.filter(
    (b) =>
      b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleAccept = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.bookingId === bookingId ? { ...b, status: "Accepted" } : b
      )
    );
  };

  const handleReject = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.bookingId === bookingId ? { ...b, status: "Rejected" } : b
      )
    );
  };

  return (
    <div className="h-screen w-full bg-[var(--card)] p-6 overflow-y-auto">
      <h2 className="text-xl font-bold text-[var(--brown)] mb-4">Dashboard</h2>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {statsData.map((item, i) => (
          <div
            key={i}
            className="bg-[var(--background)] border border-[#e4e2d8] rounded-xl p-5 transition hover:shadow-md flex flex-col justify-between gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-[#f2eada] rounded-full">{item.icon}</div>
              <div className="text-2xl font-bold text-[var(--text)]">
                {item.value}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <div className="w-full h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--brown)] transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--brown)] mb-4 mt-10">
        Your Bookings
      </h2>

      {/* Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by Booking ID or Client Name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-full px-4 py-2 pr-[15%] text-sm text-[var(--text)] border border-[#e0d6c9] focus:outline-none focus:border-2 focus:border-[var(--brown)]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-[11%] top-1/2 -translate-y-1/2 text-xs text-white font-bold"
            >
              ×
            </button>
          )}
          <div className="absolute top-0 right-0 h-full lg:w-[10%] w-[20%] bg-[var(--brown)] rounded-r-full flex items-center justify-center pointer-events-none">
            <Search size={20} className="text-white" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto overflow-y-auto"
        style={{ height: "calc(100vh - 220px)" }}
      >
        <div className="border border-[#e0d6c9] bg-[var(--background)] overflow-hidden overflow-x-auto">
          <table className="w-full text-sm text-[var(--text)] border-collapse min-w-full">
            <thead className="bg-[#f2eada] font-semibold text-left">
              <tr>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">
                  Booking ID
                </th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Date</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Client</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Service</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Location</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Status</th>
                <th className="p-3 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((b, i) => (
                <tr
                  key={i}
                  className="border-b border-[#e0d6c9] hover:bg-white transition hover:border-[var(--brown)]"
                >
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">
                    {b.bookingId}
                  </td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">
                    {b.date}
                  </td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">
                    {b.clientName}
                  </td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">
                    {b.service}
                  </td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">
                    {b.location}
                  </td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        b.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : b.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 py-4 flex gap-2">
                    <button
                      onClick={() => handleAccept(b.bookingId)}
                      className="px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-600 hover:text-white transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(b.bookingId)}
                      className="px-4 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedBookings.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center p-4 text-[var(--brown)]"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm rounded-md border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--brown)] hover:text-white disabled:opacity-50"
        >
          Prev
        </button>

        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 text-sm rounded-md border border-[#e0d6c9] text-[var(--text)] hover:border-[var(--brown)]"
          >
            {currentPage - 1}
          </button>
        )}

        <button
          className="px-3 py-1 text-sm rounded-md bg-[var(--brown)] text-white border border-[var(--brown)]"
          disabled
        >
          {currentPage}
        </button>

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 text-sm rounded-md border border-[#e0d6c9] text-[var(--text)] hover:border-[var(--brown)]"
          >
            {currentPage + 1}
          </button>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm rounded-md border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--brown)] hover:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
