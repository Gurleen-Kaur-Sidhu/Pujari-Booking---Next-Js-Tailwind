"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

// Sample reviews
const reviewsData = [
  {
    user: "Rohit Sharma",
    review: "The Pujari was on time and conducted the puja with full rituals.",
    rating: 5,
    date: "2025-07-01",
    status: "Approved",
  },
  {
    user: "Anjali Mehta",
    review: "Service was good but got delayed by 30 minutes.",
    rating: 3,
    date: "2025-06-28",
    status: "Pending",
  },
  {
    user: "Suresh Kumar",
    review: "Not satisfied with the arrangements.",
    rating: 2,
    date: "2025-06-25",
    status: "Rejected",
  },
  {
    user: "Kavita Singh",
    review: "Very professional and kind behavior. Highly recommend!",
    rating: 5,
    date: "2025-06-20",
    status: "Approved",
  },
  {
    user: "Rahul Verma",
    review: "Average experience.",
    rating: 3,
    date: "2025-06-18",
    status: "Pending",
  },
];

export default function ManageReview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const statusOptions = ["All", ...new Set(reviewsData.map((r) => r.status))];

  const filteredReviews = reviewsData.filter((r) => {
    const matchesSearch = r.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--card)] p-6 overflow-hidden">
      <h2 className="text-xl font-bold text-[var(--brown)] mb-4">Manage Reviews</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        {/* Search */}
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by user name"
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

        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-md border bg-[var(--card)] border-[#e0d6c9] focus:outline-none text-sm text-[var(--text)]"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto" style={{ height: "calc(100vh - 220px)" }}>
        <div className="border border-[#e0d6c9] bg-[var(--background)] overflow-hidden overflow-x-auto">
          <table className="w-full text-sm text-[var(--text)] border-collapse min-w-full">
            <thead className="bg-[#f2eada] font-semibold text-left">
              <tr>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">User</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Review</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Rating</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Date</th>
                <th className="p-3 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReviews.map((r, i) => (
                <tr
                  key={i}
                  className="border-b border-[#e0d6c9] hover:bg-white transition hover:border-[var(--brown)]"
                >
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{r.user}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{r.review}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{r.rating} ★</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{r.date}</td>
                  <td className="p-3 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        r.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : r.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
              {paginatedReviews.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-[var(--brown)]">
                    No reviews found.
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
