"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

// Dummy users data
const initialUsers = [
  {
    id: "#U1001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    location: "Amritsar",
    status: "Active",
  },
  {
    id: "#U1002",
    name: "Sneha Patel",
    email: "sneha@gmail.com",
    phone: "9856123478",
    location: "Ludhiana",
    status: "Pending",
  },
  {
    id: "#U1003",
    name: "Amit Verma",
    email: "amitv@gmail.com",
    phone: "9845612378",
    location: "Bathinda",
    status: "Banned",
  },
];

export default function ManageUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = users.filter((u) =>
    u.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleApprove = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Active" } : u))
    );
  };

  const handleBan = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Banned" } : u))
    );
  };

  return (
    <div className="min-h-screen w-full bg-[var(--card)] p-6 overflow-hidden">
      <h2 className="text-xl font-bold text-[var(--brown)] mb-4">Manage Users</h2>

      {/* Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by User ID or Name"
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
                <th className="p-3 py-4 border-r border-[#e0d6c9]">User ID</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Name</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Email</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Phone</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Location</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Status</th>
                <th className="p-3 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((u, i) => (
                <tr
                  key={i}
                  className="border-b border-[#e0d6c9] hover:bg-white transition hover:border-[var(--brown)]"
                >
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{u.id}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{u.name}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{u.email}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{u.phone}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">{u.location}</td>
                  <td className="p-3 py-4 border-r border-[#e0d6c9]">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : u.status === "Banned"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 py-4 flex gap-2">
                    <button
                      onClick={() => handleApprove(u.id)}
                      className="px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-600 hover:text-white transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleBan(u.id)}
                      className="px-4 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition"
                    >
                      Ban
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-[var(--brown)]">
                    No users found.
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

