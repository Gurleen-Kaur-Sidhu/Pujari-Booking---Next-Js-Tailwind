"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Heart, HeartIcon } from "lucide-react";

const pujas = [
  {
    title: "Pitru Dosh Nivaran Puja",
    price: "₹14,500",
    img: "/images/puja8.jpg",
  },
  {
    title: "Navagraha Havan",
    price: "₹8,100",
    img: "/images/puja9.jpg",
  },
  {
    title: "Ayush Havan",
    price: "₹6,500",
    img: "/images/puja10.jpg",
  },
  {
    title: "Chandi Havan",
    price: "₹21,000",
    img: "/images/puja33.jpg",
  },
];

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
];

const testimonials = [
  {
    name: "Jane D",
    role: "Delhi, India",
    image: "/images/person1.jpg",
    rating: 5,
    text: "Booking a Pandit made our Griha Pravesh so seamless. The priest was punctual and performed every ritual with devotion. Highly recommended!",
  },
  {
    name: "Harsh P.",
    role: "Bangalore, India",
    image: "/images/person2.webp",
    rating: 5,
    text: "The Satyanarayan Puja went smoothly thanks to the well-organized booking system. It's now our family's go-to platform for all puja needs.",
  },
  {
    name: "Hammer Deck",
    role: "Mumbai, India",
    image: "/images/person3.avif",
    rating: 5,
    text: "We were able to find a qualified Pandit for our Navgraha Shanti Puja within minutes. The whole experience was very professional and spiritual.",
  },
  {
    name: "Sita R.",
    role: "Hyderabad, India",
    image: "/images/person4.jpg",
    rating: 5,
    text: "A heartfelt thank you to the team for making our Ganesh Puja hassle-free. The priest brought all samagri and performed every step with care.",
  },
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [testimonialsPerPage, setTestimonialsPerPage] = useState(1);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTestimonialsPerPage(1);
      } else {
        setTestimonialsPerPage(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const startIndex = currentPage * testimonialsPerPage;
  const selectedTestimonials = testimonials.slice(
    startIndex,
    startIndex + testimonialsPerPage
  );

  const handleBookNow = (e, id) => {
    e.stopPropagation();
    // const token = localStorage.getItem("authToken");
    router.push(`/booknow/${id}`);
  };

  return (
    <>
      <section className="relative flex items-center justify-center h-[80vh] bg-[url('/images/puja44.png')] bg-bottom bg-no-repeat bg-cover">
        <div className="absolute inset-0"></div>

        <div className="relative z-10 text-center px-4">
          <div className="max-w-lg mx-auto mb-5">
            <div className="flex items-center bg-white border border-gray-300 rounded-full px-5 py-3 shadow-lg">
              <input
                type="text"
                placeholder="Search for Puja e.g. Satyanarayan Puja"
                className="flex-grow px-2 bg-transparent focus:outline-none text-gray-700"
              />
              <Image
                src="/images/glass.png"
                alt="Search"
                width={18}
                height={18}
              />
            </div>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-[var(--brown)] mb-5 leading-tight">
            Find Pandits Easily For Every
            <br />
            <span className="text-orange-600">Sacred Ritual</span>
          </h1>

          <p className="mb-6 text-md text-[var(--text)] max-w-2xl mx-auto lg:text-lg">
            Easily book experienced and verified Pujaris for your home, temple,
            or event rituals — from Griha Pravesh to online Sankalp Puja.
          </p>

          <Link href="/book">
            <button className="mt-1 bg-[var(--brown)] cursor-pointer hover:bg-[#7f1616] text-[var(--text)] font-bold py-2 px-5 rounded-full text-white transition">
              Book a Pandit
            </button>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--background)] py-10 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/images/123.png"
              alt="Ganesh Ji"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h3 className="text-[var(--brown)] font-semibold text-lg mb-2">
              How it Works
            </h3>
            <h2 className="text-2xl lg:text-4xl font-bold text-[var(--text)] mb-10">
              4 Simple Steps to Book a Pujari
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 lg:gap-x-8 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#f0e1c4] p-3 rounded-lg">
                  <Image
                    src="/images/paper.png"
                    alt="Search Icon"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <h4 className="text-[var(--brown)] font-semibold mb-2 text-lg">
                    Find a Pujari
                  </h4>
                  <p className="text-[var(--text)] text-md">
                    Browse from verified priests by city, tradition, and
                    expertise.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f0e1c4] p-3 rounded-lg">
                  <Image
                    src="/images/appointment.png"
                    alt="Calendar Icon"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <h4 className="text-[var(--brown)] font-semibold mb-2 text-lg">
                    Book Instantly
                  </h4>
                  <p className="text-[var(--text)] text-md">
                    Select your puja date and time. We will confirm the booking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f0e1c4] p-3 rounded-lg">
                  <Image
                    src="/images/report.png"
                    alt="Profile Icon"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <h4 className="text-[var(--brown)] font-semibold mb-2 text-lg">
                    View Details
                  </h4>
                  <p className="text-[var(--text)] text-md">
                    Check Pujari Ji experience, languages spoken, and reviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f0e1c4] p-3 rounded-lg">
                  <Image
                    src="/images/puja.png"
                    alt="Pooja Icon"
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <h4 className="text-[var(--brown)] font-semibold mb-2 text-lg">
                    Experience the Puja
                  </h4>
                  <p className="text-[var(--text)] text-md">
                    Sit back and enjoy your puja at home or online —
                    stress-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] lg:py-16 py-5 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text)]">
              Browse All Poojas
            </h2>

            <Link
              href="/pujas"
              className="inline-block whitespace-nowrap custom-button"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pujas.map((puja, idx) => (
              <div key={idx}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="relative h-82 w-full">
                    <Image
                      src={puja.img}
                      alt={puja.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-[var(--brown)]">
                    {puja.title}
                  </h3>
                  <p className="text-sm text-[var(--text)] mt-1">
                    Starting From
                  </p>
                  <p className="text-md mt-1 font-bold text-[var(--text)]">
                    {puja.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] lg:py-16 py-5 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text)]">
              Top Pandits in Your Area
            </h2>
            <Link
              href="/book"
              className="inline-block whitespace-nowrap custom-button"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    fill
                    className="object-cover rounded-t-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pandit.id);
                    }}
                    className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1 text-[var(--brown)]"
                  >
                    {favorites.has(pandit.id) ? (
                      <HeartIcon size={20} fill="var(--brown)" />
                    ) : (
                      <Heart size={20} />
                    )}
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[var(--brown)]">
                    {pandit.name}
                  </h3>
                  <p className="text-[var(--text)] text-sm mt-1 line-clamp-2">
                    {pandit.desc}
                  </p>
                  <div className="flex justify-between items-end mt-3">
                    <div>
                      <p className="text-[var(--brown)] font-bold">
                        {pandit.price}
                      </p>
                      <p className="text-sm text-[var(--text)]">
                        Starting from
                      </p>
                    </div>
                    {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/booknow/${pandit.id}`);
                    }}
                    className="inline-block whitespace-nowrap custom-button"
                  >
                    Book now
                  </button> */}

                    <button
                      onClick={(e) => handleBookNow(e, pandit.id)}
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
      </section>

      <section className="bg-[var(--background)] lg:py-16 py-8 px-4 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-10 border border-[#fff2d2] p-10 lg:py-[100px] py-[50px] bg-[var(--card)] rounded-xl shadow-md testimonial-section">
          <div className="lg:w-1/3">
            <h3 className="text-[var(--brown)] text-lg font-semibold mb-2">
              What Our Devotees Say
            </h3>
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text)] lg:mb-10 mb-5">
              Blessings Shared, <br /> Experiences Told
            </h2>

            <div className="flex gap-4 mt-4">
              <button
                className="border border-[var(--brown)] text-[var(--brown)] cursor-pointer p-3 rounded-md hover:bg-[var(--brown)] hover:text-white"
                onClick={handlePrev}
              >
                <FaArrowLeft />
              </button>
              <button
                className="border border-[var(--brown)] text-[var(--brown)] cursor-pointer p-3 rounded-md hover:bg-[var(--brown)] hover:text-white"
                onClick={handleNext}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-in-out">
            {selectedTestimonials.map((t, index) => (
              <div
                key={index}
                className="border border-[var(--background)] p-6 lg:py-10 py-6 rounded-xl bg-[var(--background)] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={50}
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text)]">
                      {t.name}
                    </h4>
                    <p className="text-md text-[var(--text)]">{t.role}</p>
                  </div>
                </div>

                <div className="flex text-yellow-500 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="text-[var(--text)] text-sm leading-relaxed">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
