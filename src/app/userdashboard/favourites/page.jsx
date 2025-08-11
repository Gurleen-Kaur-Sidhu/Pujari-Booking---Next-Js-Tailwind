"use client";
import {
  MapPin,
  Languages,
  ShieldCheck,
  CalendarPlus,
  Trash2,
} from "lucide-react";
import Image from "next/image";

// ✅ Ensure unique IDs
const favourites = [
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
    id: "kunal-1",
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
    id: "kunal-2",
    name: "Pandit Kunal Tripathi",
    desc: "Performs Pitra Dosh Nivaran & Kaalsarp Yog pujas across India.",
    price: "₹700.00",
    image: "/images/pandit3.avif",
    language: "Hindi",
    location: "Varanasi, Uttar Pradesh",
    experience: "10 Years",
    available: "Available Today",
  },
];

export default function DashboardFavourite() {
  return (
    <div className="min-h-screen w-full bg-[var(--card)] p-6 overflow-hidden">
      <h2 className="text-xl font-bold text-[var(--brown)] mb-6">
        My Favourite Pujaris
      </h2>

      {favourites.length === 0 ? (
        <p className="text-gray-500">You haven’t added any favourites yet.</p>
      ) : (
        <div
          className="grid gap-6 overflow-y-auto pr-2"
          style={{ height: "calc(100vh - 100px)" }} 
        >
          {favourites.map((pujari) => (
            <div
              key={pujari.id}
              className="flex items-start justify-between bg-[var(--background)] rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <div className="flex gap-4">
                <Image
                  src={pujari.image}
                  alt={pujari.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-[var(--text)] text-lg">
                    {pujari.name}
                  </h3>
                  <p className="text-sm text-[#555]">{pujari.desc}</p>
                  <div className="space-y-3 text-sm mt-2">
                    <p className="flex items-center gap-2">
                      <MapPin size={17} className="text-[var(--brown)]" />
                      {pujari.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Languages size={17} className="text-[var(--brown)]" />
                      Speaks: {pujari.language}
                    </p>
                    <p className="flex items-center gap-2">
                      <ShieldCheck size={17} className="text-[var(--brown)]" />
                      {pujari.experience} of Experience
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="flex items-center gap-1 text-sm px-3 py-1 bg-[var(--brown)] hover:bg-[#7f1616] text-white rounded-full transition">
                  <CalendarPlus size={16} /> Book
                </button>
                <button className="flex items-center gap-1 text-sm px-3 py-1 border border-gray-300 text-gray-600 hover:text-[var(--brown)] rounded-full transition">
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
