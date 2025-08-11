"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import React from "react";
import Image from "next/image";

const Page = () => {
  const [form, setForm] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]";

  return (
    <div>
      <section className="bg-[var(--background)] py-12 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Top Info */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--brown)] mb-3">Get in Touch</h2>
            <p className="text-[var(--text)] max-w-xl mx-auto">
              For any assistance related to puja types, timings, or online/offline services, feel free to contact us.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Address Form */}
            <div className="lg:col-span-2 bg-[var(--card)] rounded-2xl shadow-md hover:shadow-xl transition duration-300 lg:p-8 p-4 text-left space-y-6">
              <h2 className="text-2xl font-bold text-[var(--brown)]">Address Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-bold text-[var(--text)]">Address*</label>
                  <input
                    name="address1"
                    value={form.address1}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Enter Address"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-bold text-[var(--text)]">Address2</label>
                  <input
                    name="address2"
                    value={form.address2}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Enter Address2"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-bold text-[var(--text)]">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Enter City"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-bold text-[var(--text)]">State</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Enter State"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-bold text-[var(--text)]">Zipcode</label>
                  <input
                    name="zipcode"
                    value={form.zipcode}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Enter Zipcode"
                  />
                </div>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-sm text-[var(--text)]">
                  I have read and accept{" "}
                  <span className="text-[var(--brown)] underline cursor-pointer">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              <button
               
                className="bg-[var(--brown)] hover:bg-[#7f1616] text-white font-bold py-3 px-6 rounded-full text-sm transition flex items-center gap-2"
              >
                Continue <CheckCircle2 size={16} />
              </button>
            </div>

            {/* Booking Summary */}
            <div className="bg-[var(--card)] rounded-2xl shadow-md hover:shadow-xl transition duration-300 lg:p-8 p-4 text-left space-y-4">
              <h3 className="text-xl font-bold text-[var(--brown)]">Booking Summary</h3>

              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/images/pandit1.avif"
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                  alt="Pandit"
                />
                <div>
                  <h4 className="font-semibold text-[var(--text)]">Pandit Surendra Gautam</h4>
                  <p className="text-sm text-[var(--text)] opacity-80">⭐ (0 reviews)</p>
                  <p className="text-sm text-[var(--text)] opacity-80">
                    3-144, Begumpet, Hyderabad, Telangana 500016
                  </p>
                </div>
              </div>

              <div className="text-sm text-[var(--text)] mb-2 space-y-1">
                <p><strong>Date:</strong> 2025-07-03</p>
                <p><strong>Time:</strong> 06:30 PM</p>
              </div>

              <hr className="my-3 border-[#ccc]" />

              <div className="text-sm text-[var(--text)] space-y-1">
                <div className="flex justify-between">
                  <span>Sri Tulsi Vivah Pooja</span>
                  <span>₹4,305.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Gateway Fee</span>
                  <span>₹215.00</span>
                </div>
              </div>

              <hr className="my-3 border-[#ccc]" />

              <div className="flex justify-between font-bold text-lg text-[var(--brown)]">
                <span>Total</span>
                <span>₹4,520.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
