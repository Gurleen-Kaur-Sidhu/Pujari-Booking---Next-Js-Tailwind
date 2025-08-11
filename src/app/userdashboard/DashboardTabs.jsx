"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  const tabs = [
    { label: "Bookings", key: "bookings" },
    { label: "Transactions", key: "transactions" },
  ];

  const bookingsData = [
    {
      priest: "Pandit Harsh Vyas",
      bookingNo: "#BK12098",
      date: "2025-07-10",
      created: "2025-07-01",
      amount: "₹500",
      status: "Confirmed",
    },
    {
      priest: "Pandit Rajeev Sharma",
      bookingNo: "#BK12099",
      date: "2025-07-15",
      created: "2025-07-02",
      amount: "₹600",
      status: "Pending",
    },
    {
      priest: "Pandit Harsh Vyas",
      bookingNo: "#BK12100",
      date: "2025-07-12",
      created: "2025-07-03",
      amount: "₹500",
      status: "Confirmed",
    },
  ];

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
  ];

  const isBooking = activeTab === "bookings";
  const data = isBooking ? bookingsData : transactionsData;

  const filteredData = data.filter((item) => {
    const matchSearch = isBooking
      ? item.priest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bookingNo.toLowerCase().includes(searchTerm.toLowerCase())
      : item.txnId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === "All" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusOptions = ["All", ...new Set(data.map((item) => item.status))];

  const handleTabSwitch = (tabKey) => {
    setActiveTab(tabKey);
    setSearchTerm("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

 const handleSearch = (e) => {
  setSearchTerm(e.target.value);
  setCurrentPage(1);
};

const handleStatusChange = (e) => {
  setStatusFilter(e.target.value);
  setCurrentPage(1);
};

const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) setCurrentPage(page);
};


  return (
    <div className="w-full min-h-screen bg-[var(--card)] p-6 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-[#ddd] mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-5 py-2 text-sm font-semibold border-b-2 transition-all ${
              activeTab === tab.key
                ? "border-[var(--brown)] text-[var(--brown)]"
                : "border-transparent text-[var(--text)]/70 hover:text-[var(--brown)]"
            }`}
            onClick={() => handleTabSwitch(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col justify-between sm:flex-row gap-3 mb-4">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder={
              isBooking
                ? "Search by priest or booking no."
                : "Search by transaction ID"
            }
            value={searchTerm}
            onChange={handleSearch}
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

        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="px-4 py-2 rounded-md border border-[#e0d6c9] bg-[var(--card)]  focus:outline-none text-sm text-[var(--text)]"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  overflow-y-auto" style={{ height: "calc(100vh - 220px)" }}>
        <div className="border border-[#e0d6c9] bg-[var(--background)] overflow-hidden overflow-x-auto">
          <table className="w-full text-sm text-[var(--text)] border-collapse min-w-full">
            <thead className="bg-[#f2eada] text-left font-semibold capitalize">
              <tr>
                {isBooking ? (
                  <>
                    <th className="p-3 py-4 border-r border-[#e0d6c9]">Priest</th>
                    <th className="p-3 py-4 border-r border-[#e0d6c9]">Booking No.</th>
                    <th className="p-3 py-4 border-r border-[#e0d6c9]">Booking Date</th>
                    <th className="p-3 py-4 border-r border-[#e0d6c9]">Created On</th>
                    <th className="p-3 py-4 border-r border-[#e0d6c9]">Amount</th>
                    <th className="p-3 py-4">Status</th>
                  </>
                ) : (
                  <>
                    <th className="p-3 py-4 border-r border-[#e0d6c9]">Transaction ID</th>
                    <th className="p-3 py-4 border-r border-[#e0d6c9]">Date</th>
                    <th className="p-3 py-4 border-r border-[#e0d6c9]">Amount</th>
                    <th className="p-3 py-4 border-r border-[#e0d6c9]">Method</th>
                    <th className="p-3 py-4">Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-white border-b border-[#e0d6c9] transition hover:border-[var(--brown)]"
                >
                  {isBooking ? (
                    <>
                      <td className="p-3 py-4 border-r border-[#e0d6c9]">{item.priest}</td>
                      <td className="p-3 py-4 border-r border-[#e0d6c9]">{item.bookingNo}</td>
                      <td className="p-3 py-4 border-r border-[#e0d6c9]">{item.date}</td>
                      <td className="p-3 py-4 border-r border-[#e0d6c9]">{item.created}</td>
                      <td className="p-3 py-4 border-r border-[#e0d6c9]">{item.amount}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 py-4 border-r border-[#e0d6c9]">{item.txnId}</td>
                      <td className="p-3 py-4 border-r border-[#e0d6c9]">{item.date}</td>
                      <td className="p-3 py-4 border-r border-[#e0d6c9]">{item.amount}</td>
                      <td className="p-3 py-4 border-r border-[#e0d6c9]">{item.method}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Success"
                              ? "bg-green-100 text-green-700"
                              : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={isBooking ? 6 : 5} className="text-center p-4 text-[var(--brown)]">
                    No {isBooking ? "bookings" : "transactions"} found.
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
