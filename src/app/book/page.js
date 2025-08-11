"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { Heart, HeartIcon } from "lucide-react";

const pandits = [
  {
    id: "harsh-vyas",
    name: "Pandit Harsh Vyas",
    desc: "Specialist in Vedic rituals & Grah Shanti pujas with 15+ years of experience.",
    price: "₹500.00",
    image: "/images/pandit1.avif",
    language: "Hindi, Sanskrit",
    location: "Ujjain, Madhya Pradesh",
    experience: "15+ Years",
    available: "Available Today",
  },
  {
    id: "rajeev",
    name: "Pandit Rajeev Sharma",
    desc: "Known for accurate muhurat & knowledgeable in Sanskrit mantras.",
    price: "₹600.00",
    image: "/images/pandit2.avif",
    language: "Hindi, English",
    location: "Delhi",
    experience: "12 Years",
    available: "Available Today",
  },
  {
    id: "Kunal",
    name: "Pandit Kunal Tripathi",
    desc: "Performs Pitra Dosh Nivaran & Kaalsarp Yog pujas across India.",
    price: "₹700.00",
    image: "/images/pandit3.avif",
    language: "Hindi",
    location: "Varanasi, Uttar Pradesh",
    experience: "10 Years",
    available: "Available Today",
  },
  {
    id: "Lokesh",
    name: "Pandit Lokesh Joshi",
    desc: "Expert in online pujas for NRIs, including Satyanarayan Katha.",
    price: "₹800.00",
    image: "/images/pandit4.avif",
    language: "English, Hindi",
    location: "Mumbai, Maharashtra",
    experience: "14 Years",
    available: "Available Today",
  },
  {
    id: "Rajeev2",
    name: "Pandit Rajeev Sharma",
    desc: "Known for accurate muhurat & knowledgeable in Sanskrit mantras.",
    price: "₹600.00",
    image: "/images/pandit7.webp",
    language: "Hindi, Punjabi",
    location: "Amritsar, Punjab",
    experience: "11 Years",
    available: "Available Today",
  },
  {
    id: "Kunal2",
    name: "Pandit Kunal Tripathi",
    desc: "Performs Pitra Dosh Nivaran & Kaalsarp Yog pujas across India.",
    price: "₹700.00",
    image: "/images/pandit5.avif",
    language: "Hindi, Marathi",
    location: "Nagpur, Maharashtra",
    experience: "9 Years",
    available: "Available Today",
  },
  {
    id: "Lokesh2",
    name: "Pandit Lokesh Joshi",
    desc: "Expert in online pujas for NRIs, including Satyanarayan Katha.",
    price: "₹800.00",
    image: "/images/pandit6.jpg",
    language: "Tamil, English",
    location: "Chennai, Tamil Nadu",
    experience: "16 Years",
    available: "Available Today",
  },
];
const CollapsibleSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="pb-2 mb-3 px-5">
      <button
        className="w-full flex justify-between items-center text-[var(--text)] font-semibold text-sm mb-2"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="space-y-3">{children}</div>}
    </div>
  );
};
// [var(--card)]
const Page = () => {
  const router = useRouter();
 const [favorites, setFavorites] = useState(new Set()); 

  const toggleFavorite = (panditId) => {
    setFavorites((prevFavs) => {
      const newFavs = new Set(prevFavs);
      if (newFavs.has(panditId)) {
        newFavs.delete(panditId);
      } else {
        newFavs.add(panditId);
      }
      return newFavs;
    });
  };
  return (
    <div className="flex min-h-screen bg-[var(--background)] px-4 lg:px-20 gap-5 py-5 items-start booking-page">
      <div className="w-80 bg-[var(--background)] rounded-lg shadow-lg space-y-4 filter-div">
        <h2 className="text-xl font-bold text-[var(--brown)] bg-[var(--card)] p-5 rounded-tr-lg rounded-tl-lg">
          Filter
        </h2>

        <CollapsibleSection title="Search Type">
          <select className="w-full border border-[#cdd2c1] rounded-md p-2 text-sm">
            <option>Online</option>
            <option>Home</option>
          </select>
        </CollapsibleSection>

        <CollapsibleSection title="Search Puja">
          <input
            type="text"
            placeholder="Eg. Satyanarayan, Rudrabhishek..."
            className="w-full border border-[#cdd2c1] rounded-md p-2 text-sm"
          />
        </CollapsibleSection>

        <CollapsibleSection title="Location">
          <input
            type="text"
            placeholder="Enter city or area"
            className="w-full border border-[#cdd2c1] rounded-md p-2 text-sm"
          />
        </CollapsibleSection>

        <CollapsibleSection title="Language">
          <select className="w-full border border-[#cdd2c1] rounded-md p-2 text-sm">
            <option>Any</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Punjabi</option>
            <option>Tamil</option>
          </select>
        </CollapsibleSection>

        <CollapsibleSection title="Availability">
          {[
            "Available Today",
            "Available Tomarrow",
            "Available in Next 7 Days",
            "Available in Next 30 Days",
          ].map((label, i) => (
            <label key={i} className="flex items-center space-x-2 text-sm">
              <input
                type="radio"
                name="availability"
                className="accent-[var(--brown)]"
              />
              <span>{label}</span>
            </label>
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="By Rating">
          {[5, 4, 3, 2, 1].map((starCount) => (
            <label key={starCount} className="flex items-center space-x-2">
              <input type="radio" name="rating" className="accent-[var(--brown)]" />
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < starCount ? "var(--brown)" : "#d1d5db"}
                    stroke="none"
                  />
                ))}
              </div>
            </label>
          ))}
        </CollapsibleSection>

        <div className="flex gap-4 p-5 pt-2">
          <button className="flex-1 text-[var(--text)] cursor-pointer hover:text-[var(--brown)] hover:bg-[var(--background)] border border-[var(--brown)] font-bold bg-[var(--brown)] py-2 px-5 rounded-full text-white transition">
            Apply
          </button>
          <button className="flex-1 text-[var(--brown)] cursor-pointer hover:bg-[var(--brown)] font-bold border border-[var(--brown)] py-2 px-5 rounded-full text-[var(--brown)] hover:text-white transition">
            Reset
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto max-h-[calc(115vh)]  pandit-booking-page"
        style={{ scrollbarWidth: "none" }}
      >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pandits.map((pandit) => (
            <div
              key={pandit.id}
              onClick={() => router.push(`/book/${pandit.id}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition cursor-pointer relative"
            >
              <div className="h-60 relative w-full">
                <Image
                  src={pandit.image}
                  alt={pandit.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(pandit.id);
                  }}
                  className="absolute top-2 right-2 bg-white hover:bg-opacity-100 rounded-full p-1 text-[var(--brown)]"
                >
                  {favorites.has(pandit.id) ? (
                    <HeartIcon size={20} fill="var(--brown)" />
                  ) : (
                    <Heart size={20} />
                  )}
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-[var(--brown)]">{pandit.name}</h3>
                <p className="text-[var(--text)] text-sm mt-1 line-clamp-2">{pandit.desc}</p>
                <div className="flex justify-between items-end mt-3">
                  <div>
                    <p className="text-[var(--brown)] font-bold">{pandit.price}</p>
                    <p className="text-sm text-[var(--text)]">Starting from</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/booknow/${pandit.id}`);
                    }}
                    className="inline-block whitespace-nowrap custom-button"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
