"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

// Initial bookings data
const initialBookings = [
  {
    id: "#BK1001",
    clientName: "Rahul Sharma",
    service: "Griha Pravesh",
    location: "Amritsar",
    date: "2025-07-01",
    status: "Pending",
  },
  {
    id: "#BK1002",
    clientName: "Sneha Patel",
    service: "Satyanarayan Katha",
    location: "Ludhiana",
    date: "2025-07-02",
    status: "Pending",
  },
  {
    id: "#BK1003",
    clientName: "Amit Verma",
    service: "Wedding",
    location: "Bathinda",
    date: "2025-06-28",
    status: "Pending",
  },
  {
    id: "#BK1004",
    clientName: "Priya Desai",
    service: "Mundan Ceremony",
    location: "Chandigarh",
    date: "2025-06-27",
    status: "Pending",
  },
];

export default function ManageBooking() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = bookings.filter((b) =>
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleAccept = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Accepted" } : b))
    );
  };

  const handleReject = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Rejected" } : b))
    );
  };

  return (
    <div className="min-h-screen w-full bg-[var(--card)] p-6 overflow-hidden">
      <h2 className="text-xl font-bold text-[var(--brown)] mb-4">Manage Bookings</h2>

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
      <div className="overflow-x-auto overflow-y-auto" style={{ height: "calc(100vh - 220px)" }}>
        <div className="border border-[#e0d6c9] bg-[var(--background)] overflow-hidden overflow-x-auto">
          <table className="w-full text-sm text-[var(--text)] border-collapse min-w-full">
            <thead className="bg-[#f2eada] font-semibold text-left">
              <tr>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Booking ID</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Client Name</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Service</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Location</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Date</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Status</th>
                <th className="p-3 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((b, i) => (
                <tr
                  key={i}
                  className="border-b border-[#e0d6c9] hover:bg-white transition hover:border-[var(--brown)]"
                >
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{b.id}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{b.clientName}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{b.service}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{b.location}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{b.date}</td>
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
                      onClick={() => handleAccept(b.id)}
                      className="px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-600 hover:text-white transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(b.id)}
                      className="px-4 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-[var(--brown)]">
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
