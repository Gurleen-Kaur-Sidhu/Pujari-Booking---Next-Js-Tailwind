import React from "react";
import Image from "next/image";
import Link from "next/link";
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
  {
    title: "Navagraha Havan",
    price: "₹8,100",
    img: "/images/puja7.webp",
  },
  {
    title: "Ayush Havan",
    price: "₹6,500",
    img: "/images/puja6.jpg",
  },
  {
    title: "Chandi Havan",
    price: "₹21,000",
    img: "/images/puja5.jpg",
  },
];
const page = () => {
  return (
    <div className="bg-[var(--background)] px-4 lg:px-20 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {pujas.map((puja, idx) => (
          <div key={idx}>
            <Link href='/book'>
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="relative h-82 w-full">
                <Image
                  src={puja.img}
                  alt={puja.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-[var(--brown)]">
                {puja.title}
              </h3>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-[var(--text)]">Starting from</p>
                  <p className="text-[var(--brown)] font-bold mt-1">{puja.price}</p>
                </div>

                <button className="mt-3 inline-block whitespace-nowrap custom-button">
                  Book now
                </button>
              </div>
            </div></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
