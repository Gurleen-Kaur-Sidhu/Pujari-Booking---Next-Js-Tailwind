import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[var(--brown)] text-[var(--text)] lg:pt-15 pt-8 pb-6 px-6 lg:px-20 border-t border-orange-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 lg:mb-15 mb-8">
          <div>
            <Link
              href="/"
              className="flex items-center text-[var(--card)] font-extrabold text-xl mb-4 tracking-tight"
            >
              BookMyPuja
            </Link>
            <p className="text-sm text-[var(--card)]">
              Your trusted platform to book verified Pandits for any occasion —
              from Griha Pravesh to Online Sankalp Puja.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--card)] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[var(--card)]">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:underline">
                  Book A Pujari
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--card)] mb-4">
              Puja Services
            </h4>
            <ul className="space-y-2 text-sm text-[var(--card)]">
              <li>
                <a href="#" className="hover:underline">
                  Griha Pravesh
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Satyanarayan Puja
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Kaal Sarp Dosh
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pitra Dosh Nivaran
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--card)] mb-4">
              Contact Us
            </h4>
            <p className="text-sm text-[var(--card)] mb-2 flex gap-2 cursor-pointer">
              {" "}
              <Image
                src="/images/telephone.png"
                alt="Facebook"
                width={17}
                height={17}
                style={{ height: "auto" }}
              />
              +91 9869 92 92 92
            </p>
            <p className="text-sm text-[var(--card)] mb-4 flex gap-2 cursor-pointer">
              <Image
                src="/images/mail.png"
                alt="Facebook"
                width={20}
                height={20}
              />
              support@shubhpuja.com
            </p>

            <div className="flex space-x-4">
              <a href="#" className="text-[var(--brown)] hover:text-orange-600">
                <Image
                  src="/images/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#" className="text-[var(--brown)] hover:text-orange-600">
                <Image
                  src="/images/instagram.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#" className="text-[var(--brown)] hover:text-orange-600">
                <Image
                  src="/images/twitter.png"
                  alt="YouTube"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-[var(--card)] mt-10 border-t pt-4">
          © {new Date().getFullYear()} BookMyPuja. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
