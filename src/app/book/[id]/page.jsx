"use client";

import { useParams } from "next/navigation";
import {
  MapPin,
  Languages,
  ShieldCheck,
  MessageSquare,
  CalendarPlus,
  Heart,
  HeartIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  pujas: ["Grah Shanti", "Vedic Havan", "Marriage Puja", "Mundan Sanskar"],
}
,
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
  pujas: ["Grah Shanti", "Vedic Havan", "Marriage Puja", "Mundan Sanskar"],

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
  pujas: ["Grah Shanti", "Vedic Havan", "Marriage Puja", "Mundan Sanskar"],

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
  pujas: ["Grah Shanti", "Vedic Havan", "Marriage Puja", "Mundan Sanskar"],

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
  pujas: ["Grah Shanti", "Vedic Havan", "Marriage Puja", "Mundan Sanskar"],

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
  pujas: ["Grah Shanti", "Vedic Havan", "Marriage Puja", "Mundan Sanskar"],

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
  pujas: ["Grah Shanti", "Vedic Havan", "Marriage Puja", "Mundan Sanskar"],
    
  },
];

const Page = () => {
  const { id } = useParams();
  const [isFav, setIsFav] = useState(false);

  const pujari = pandits.find((p) => p.id === id);

  if (!pujari) {
    return (
      <div className="bg-[var(--background)] flex items-center justify-center min-h-screen">
        <h2 className="text-xl text-[var(--brown)] font-bold">
          No Pujari found for ID: <span className="text-[var(--text)]">{id}</span>
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] px-4 lg:px-20 py-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-[var(--brown)] mb-3">Pujari Profile</h2>
        <p className="text-[var(--text)] max-w-xl mx-auto">{pujari.desc}</p>
      </div>

      <section className="bg-[var(--card)] py-10 px-6 md:px-12 rounded-2xl shadow-lg max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start relative">

        {/* Image */}
        <div className="w-full md:w-1/3">
          <Image
            src={pujari.image}
            alt={pujari.name}
            width={300}
            height={300}
            className="rounded-2xl object-cover shadow-lg w-full h-60 md:h-72"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-2/3 space-y-5 text-[var(--text)]">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <h2 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
              {pujari.name}
              <button
                onClick={() => setIsFav((prev) => !prev)}
                className="text-[var(--brown)] hover:scale-110 transition"
              >
                {isFav ? (
                  <HeartIcon size={24} fill="var(--brown)" />
                ) : (
                  <Heart size={24} />
                )}
              </button>
            </h2>
            <span className="bg-green-600 text-white px-4 py-1 rounded-lg mt-4 lg:mt-0 text-sm">
              {pujari.available}
            </span>
          </div>

          <div className="space-y-3 text-sm">
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

          {/* Pujas Offered */}
          {pujari.pujas && pujari.pujas.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-[var(--brown)] text-lg mb-2">
                Pujas Offered:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 text-sm">
                {pujari.pujas.map((puja, index) => (
                  <span
                    key={index}
                    className="border border-[#ccc] text-[var(--text)] px-3 py-1 inline-block rounded-lg text-center"
                  >
                    {puja}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-row booknow-messagebtn gap-4 mt-6">
            <Link href={`/booknow/${pujari.id}`}>
              <button className="flex items-center book-now gap-2 justify-center text-white bg-[var(--brown)] hover:bg-[#7f1616] py-2 px-5 rounded-full font-semibold transition">
                <CalendarPlus size={16} /> Book Now
              </button>
            </Link>
            <button className="flex items-center justify-center gap-2 text-[var(--brown)] border border-[var(--brown)] hover:bg-[var(--brown)] hover:text-white py-2 px-5 rounded-full font-semibold transition">
              <MessageSquare size={16} /> Message
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
