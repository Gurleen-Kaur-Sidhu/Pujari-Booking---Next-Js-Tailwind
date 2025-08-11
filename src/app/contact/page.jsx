import React from "react";
import Image from "next/image";
const page = () => {
  return (
    <div>
      <section className="bg-[var(--background)] py-12 px-4 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--brown)] mb-3">
              Get in Touch
            </h2>
            <p className="text-[var(--text)] max-w-xl mx-auto">
              Have questions, feedback, or need help booking a puja? Contact
              us..
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
           
            <div className="bg-[var(--card)] rounded-2xl shadow-md hover:shadow-xl transition duration-300 lg:p-8  p-4 text-left space-y-4">
              <div >
                <h3 className="text-xl font-bold text-[var(--brown)] mb-2">
                  Contact Details
                </h3>
                <p className="text-[var(--text)]">
                  Email:{" "}
                  <a href="mailto:support@shubhpuja.com">
                    support@shubhpuja.com
                  </a>
                </p>
                <p className="text-[var(--text)] mt-1">Phone: +91 9869 92 92 92</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--brown)] mb-2">
                  Address
                </h3>
                <p className="text-[var(--text)]">
                  2nd Floor, Shree Complex,
                  <br />
                  Near Lakshmi Temple, Delhi, India
                </p>
              </div>

             <div className="flex justify-between items-start contact-image">
               <div>
                <h3 className="text-xl font-bold text-[var(--brown)] mb-2">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-[var(--brown)] hover:text-orange-600">
                    <Image
                      src="/images/icon11.png"
                      alt="Facebook"
                      width={20}
                      height={20}
                    />
                  </a>
                  <a href="#" className="text-[var(--brown)] hover:text-orange-600">
                    <Image
                      src="/images/icon2.png"
                      alt="Instagram"
                      width={20}
                      height={20}
                    />
                  </a>
                  <a href="#" className="text-[var(--brown)] hover:text-orange-600">
                    <Image
                      src="/images/icon3.png"
                      alt="YouTube"
                      width={20}
                      height={20}
                    />
                  </a>
                </div>
              </div>

              <div className="">
                <Image
                  src="/images/im3.png"
                  alt="Facebook"
                  width={300}
                  height={300}
                />
              </div>
             </div>
            </div>

            <div className="bg-[var(--card)] rounded-2xl shadow-md hover:shadow-xl transition duration-300 lg:p-8  p-4 text-left space-y-4">
              <form className="space-y-6">
                <div>
                  <label className="block text-[var(--text)] font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#cdd2c1] rounded-md p-3 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text)] font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-[#cdd2c1] rounded-md p-3 text-sm"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text)] font-semibold mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full border border-[#cdd2c1] rounded-md p-3 text-sm h-32 resize-none"
                    placeholder="Write your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[var(--brown)] hover:bg-[#7f1616] text-white font-bold py-3 px-6 rounded-full transition cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
