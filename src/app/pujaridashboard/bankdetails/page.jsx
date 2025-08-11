"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function BankDetails() {
  const [form, setForm] = useState({
    dob: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    accFirst: "",
    accLast: "",
    accHolder: "",
    accNumber: "",
    routingNumber: "",
    swiftCode: "",
    ssn: "",
    ifsc: "",
    bankName: "",
    branchAddress: "",
  });

  const inputStyle =
    "w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Bank details submitted!");
    console.log("Form submitted:", form);
    // Optional: send data to backend here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen w-full bg-[var(--card)] p-6 overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-[var(--brown)] mb-6">
        Bank Details
      </h2>

      {/* Personal Info */}
      <h3 className="text-lg font-semibold text-[var(--brown)] mb-2">
        Personal Information
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm font-semibold">Date of Birth</label>
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">State</label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Zipcode</label>
          <input
            name="zipcode"
            value={form.zipcode}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
      </div>

      {/* Bank Info */}
      <h3 className="text-lg font-semibold text-[var(--brown)] mb-2">
        Account Information
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Account Holder First Name
          </label>
          <input
            name="accFirst"
            value={form.accFirst}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Account Holder Last Name
          </label>
          <input
            name="accLast"
            value={form.accLast}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Account Number</label>
          <input
            name="accNumber"
            value={form.accNumber}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Account Holder Name</label>
          <input
            name="accHolder"
            value={form.accHolder}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Routing Number</label>
          <input
            name="routingNumber"
            value={form.routingNumber}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">SWIFT/BIC Code</label>
          <input
            name="swiftCode"
            value={form.swiftCode}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">
            SSN (for USA ***-**-****)
          </label>
          <input
            name="ssn"
            placeholder="***-**-****"
            value={form.ssn}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">IFSC Code</label>
          <input
            name="ifsc"
            value={form.ifsc}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Bank Name</label>
          <input
            name="bankName"
            value={form.bankName}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold">Branch Address</label>
          <input
            name="branchAddress"
            value={form.branchAddress}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-[var(--brown)] hover:bg-[#7f1616] text-white font-semibold py-3 px-8 rounded-full text-sm"
      >
        Submit
      </button>
    </form>
  );
}
