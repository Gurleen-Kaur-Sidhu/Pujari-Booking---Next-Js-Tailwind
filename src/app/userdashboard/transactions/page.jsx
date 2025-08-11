"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

// Sample transactions
const transactionsData = [
  {
    txnId: "#TX8931",
    date: "2025-07-01",
    amount: "₹500",
    method: "UPI",
    status: "Success",
  },
  {
    txnId: "#TX8932",
    date: "2025-07-02",
    amount: "₹600",
    method: "Card",
    status: "Pending",
  },
  {
    txnId: "#TX8933",
    date: "2025-06-28",
    amount: "₹700",
    method: "Net Banking",
    status: "Failed",
  },
  {
    txnId: "#TX8934",
    date: "2025-06-27",
    amount: "₹450",
    method: "UPI",
    status: "Success",
  },
  {
    txnId: "#TX8935",
    date: "2025-06-25",
    amount: "₹800",
    method: "Card",
    status: "Pending",
  }, {
    txnId: "#TX8931",
    date: "2025-07-01",
    amount: "₹500",
    method: "UPI",
    status: "Success",
  },
  {
    txnId: "#TX8932",
    date: "2025-07-02",
    amount: "₹600",
    method: "Card",
    status: "Pending",
  },
  {
    txnId: "#TX8933",
    date: "2025-06-28",
    amount: "₹700",
    method: "Net Banking",
    status: "Failed",
  },
  {
    txnId: "#TX8934",
    date: "2025-06-27",
    amount: "₹450",
    method: "UPI",
    status: "Success",
  },
  {
    txnId: "#TX8935",
    date: "2025-06-25",
    amount: "₹800",
    method: "Card",
    status: "Pending",
  },
  {
    txnId: "#TX8931",
    date: "2025-07-01",
    amount: "₹500",
    method: "UPI",
    status: "Success",
  },
  {
    txnId: "#TX8932",
    date: "2025-07-02",
    amount: "₹600",
    method: "Card",
    status: "Pending",
  },
  {
    txnId: "#TX8933",
    date: "2025-06-28",
    amount: "₹700",
    method: "Net Banking",
    status: "Failed",
  },
  {
    txnId: "#TX8934",
    date: "2025-06-27",
    amount: "₹450",
    method: "UPI",
    status: "Success",
  },
  {
    txnId: "#TX8935",
    date: "2025-06-25",
    amount: "₹800",
    method: "Card",
    status: "Pending",
  },
];

export default function DashboardTransaction() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const statusOptions = ["All", ...new Set(transactionsData.map((t) => t.status))];

  const filteredTransactions = transactionsData.filter((t) => {
    const matchesSearch = t.txnId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--card)] p-6 overflow-hidden">
      <h2 className="text-xl font-bold text-[var(--brown)] mb-4">Your Transactions</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        {/* Search */}
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by transaction ID"
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
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Transaction ID</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Date</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Amount</th>
                <th className="p-3 py-4 border-r border-[#e0d6c9]">Method</th>
                <th className="p-3 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((t, i) => (
                <tr
                  key={i}
                  className="border-b border-[#e0d6c9] hover:bg-white transition hover:border-[var(--brown)]"
                >
                  <td className="p-3 py-4 py-4 border-r border-[#e0d6c9]">{t.txnId}</td>
                  <td className="p-3 py-4 py-4 border-r border-[#e0d6c9]">{t.date}</td>
                  <td className="p-3 py-4 py-4 border-r border-[#e0d6c9]">{t.amount}</td>
                  <td className="p-3 py-4 py-4 border-r border-[#e0d6c9]">{t.method}</td>
                  <td className="p-3 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        t.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : t.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
              {paginatedTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-[var(--brown)]">
                    No transactions found.
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
