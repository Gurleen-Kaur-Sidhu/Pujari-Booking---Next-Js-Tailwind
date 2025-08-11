"use client";
import { useState } from "react";
import { Search, IndianRupee, Wallet, ArrowDownToLine, ArrowUpRight } from "lucide-react";

const statsData = [
  {
    label: "Total Earnings",
    value: "₹42,000",
    icon: <IndianRupee className="text-[var(--brown)] w-7 h-7" />,
    progress: 85,
  },
  {
    label: "Earnings This Month",
    value: "₹9,500",
    icon: <Wallet className="text-[var(--brown)] w-7 h-7" />,
    progress: 70,
  },
  {
    label: "Withdrawable Balance",
    value: "₹13,000",
    icon: <ArrowDownToLine className="text-[var(--brown)] w-7 h-7" />,
    progress: 60,
  },
  {
    label: "Total Withdrawals",
    value: "₹29,000",
    icon: <ArrowUpRight className="text-[var(--brown)] w-7 h-7" />,
    progress: 68,
  },
];

const initialWithdrawals = [
  {
    withdrawalId: "#WD2021",
    date: "2025-07-01",
    amount: "₹2,000",
    method: "Bank Transfer",
    status: "Pending",
  },
  {
    withdrawalId: "#WD2022",
    date: "2025-07-03",
    amount: "₹1,500",
    method: "UPI",
    status: "Accepted",
  },
  {
    withdrawalId: "#WD2023",
    date: "2025-07-04",
    amount: "₹3,000",
    method: "Bank Transfer",
    status: "Rejected",
  },
  {
    withdrawalId: "#WD2024",
    date: "2025-07-06",
    amount: "₹1,800",
    method: "UPI",
    status: "Pending",
  },
  {
    withdrawalId: "#WD2025",
    date: "2025-07-08",
    amount: "₹2,500",
    method: "Bank Transfer",
    status: "Pending",
  },
];

export default function ManageEarning() {
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredWithdrawals = withdrawals.filter(
    (w) =>
      w.withdrawalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);
  const paginatedData = filteredWithdrawals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAccept = (id) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.withdrawalId === id ? { ...w, status: "Accepted" } : w))
    );
  };

  const handleReject = (id) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.withdrawalId === id ? { ...w, status: "Rejected" } : w))
    );
  };

  return (
    <div className="h-screen w-full bg-[var(--card)] p-6 overflow-y-auto">
      <h2 className="text-xl font-bold text-[var(--brown)] mb-4">Manage Earnings</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {statsData.map((item, i) => (
          <div
            key={i}
            className="bg-[var(--background)] border border-[#e4e2d8] rounded-xl p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div className="p-3 bg-[#f2eada] rounded-full">{item.icon}</div>
              <div className="text-2xl font-bold text-[var(--text)]">{item.value}</div>
            </div>
            <p className="text-sm font-medium text-gray-600 mt-2">{item.label}</p>
            <div className="w-full h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--brown)] transition-all duration-300"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--brown)] mb-4">Withdrawal Requests</h2>

      {/* Search Bar */}
      <div className="relative w-full sm:w-1/2 mb-5">
        <input
          type="text"
          placeholder="Search by Withdrawal ID or Method"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-full px-4 py-2 pr-[15%] text-sm text-[var(--text)] border border-[#e0d6c9] focus:outline-none focus:border-[var(--brown)]"
        />
        <div className="absolute top-0 right-0 h-full lg:w-[10%] w-[20%] bg-[var(--brown)] rounded-r-full flex items-center justify-center pointer-events-none">
          <Search size={20} className="text-white" />
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
              <th className="p-3 border-r border-[#e0d6c9]">Withdrawal ID</th>
              <th className="p-3 border-r border-[#e0d6c9]">Date</th>
              <th className="p-3 border-r border-[#e0d6c9]">Amount</th>
              <th className="p-3 border-r border-[#e0d6c9]">Method</th>
              <th className="p-3 border-r border-[#e0d6c9]">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((w, i) => (
              <tr key={i} className="border-b border-[#e0d6c9] hover:bg-white transition hover:border-[var(--brown)]">
                <td className="p-3 border-r border-[#e0d6c9]">{w.withdrawalId}</td>
                <td className="p-3 border-r border-[#e0d6c9]">{w.date}</td>
                <td className="p-3 border-r border-[#e0d6c9]">{w.amount}</td>
                <td className="p-3 border-r border-[#e0d6c9]">{w.method}</td>
                <td className="p-3 border-r border-[#e0d6c9]">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      w.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : w.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {w.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleAccept(w.withdrawalId)}
                    className="px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-600 hover:text-white"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(w.withdrawalId)}
                    className="px-4 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-600 hover:text-white"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-[var(--brown)]">
                  No withdrawal requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
     
    </div> <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm rounded-md border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--brown)] hover:text-white disabled:opacity-50"
        >
          Prev
        </button>

        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
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
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 text-sm rounded-md border border-[#e0d6c9] text-[var(--text)] hover:border-[var(--brown)]"
          >
            {currentPage + 1}
          </button>
        )}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm rounded-md border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--brown)] hover:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div></div>
  );
}
