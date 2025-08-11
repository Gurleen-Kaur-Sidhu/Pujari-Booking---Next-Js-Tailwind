import React from "react";
import { Sparkles, PhoneCall, HomeIcon, Landmark } from "lucide-react";
import { BadgeCheck, CalendarCheck2, Globe, Users, Video,MessageSquare } from "lucide-react";

const benefits = [
  {
    title: "Verified Pujaris",
    icon: <BadgeCheck className="w-10 h-10 text-[var(--brown)]" />,
    desc: "All our priests are background-verified, certified, and well-versed in Vedic rituals.",
  },
  {
    title: "Easy Online Booking",
    icon: <CalendarCheck2 className="w-10 h-10 text-[var(--brown)]" />,
    desc: "Book your puja in just a few clicks. Pick your preferred date, time, and language.",
  },
  {
    title: "All-India Access",
    icon: <Globe className="w-10 h-10 text-[var(--brown)]" />,
    desc: "Available across major cities & temples in India — wherever you are.",
  },
  {
    title: "Live Video Pujas",
    icon: <Video className="w-10 h-10 text-[var(--brown)]" />,
    desc: "Join live pujas via video call, performed by expert priests in your name.",
  },
  {
    title: "Multilingual Priests",
    icon: <Users className="w-10 h-10 text-[var(--brown)]" />,
    desc: "Choose pandits who speak your language — Hindi, Sanskrit, Tamil, Telugu, and more.",
  },
  {
    title: "Authentic Rituals",
    icon: <Sparkles className="w-10 h-10 text-[var(--brown)]" />,
    desc: "We follow strict Vedic practices with complete vidhi and samagri guidance.",
  },
  
];

const services = [
  {
    title: "Home Puja Services",
    desc: "Book expert Pujaris for Satyanarayan Katha, Griha Pravesh, Lakshmi Puja, and more — right at your doorstep.",
    icon: <HomeIcon className="w-10 h-10 text-[var(--brown)]" />,
  },
  {
    title: "Online Puja & Consultation",
    desc: "Join live pujas or consult experienced priests for astrology, dosh nivaran, and muhurat guidance from anywhere.",
    icon: <PhoneCall className="w-10 h-10 text-[var(--brown)]" />,
  },
  {
    title: "Temple Puja Booking",
    desc: "Book offerings in temples across India, performed in your name by our verified priests with authentic rituals.",
    icon: <Landmark className="w-10 h-10 text-[var(--brown)]" />,
  },
  {
    title: "Event Puja Management",
    desc: "Organize large-scale pujas for weddings, housewarmings, and business inaugurations with full ritual planning and execution.",
    icon: <Users className="w-10 h-10 text-[var(--brown)]" />,
  },
  {
    title: "Custom Puja Requests",
    desc: "Looking for something unique? Send us your requirements and we’ll arrange a customized ritual tailored for your needs.",
    icon: <Sparkles className="w-10 h-10 text-[var(--brown)]" />,
  },
{
  title: "Puja Planning Help",
  desc: "Contact us anytime for queries, ritual planning, or personalized recommendations — we’re here to help.",
  icon: <MessageSquare className="w-10 h-10 text-[var(--brown)]" />,
}


];

const page = () => {
  return (
    <div>
      <section className="bg-[var(--background)] py-16 px-4 pb-20 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--brown)] mb-3">
            Our Services
          </h2>
          <p className="text-[var(--text)] max-w-xl mx-auto">
            Discover divine services tailored for your spiritual needs —
            delivered with tradition, trust, and devotion.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[var(--card)] rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 text-left border-t-4 border-[var(--brown)]"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--text)]">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] py-16 pt-5 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto text-center bg-[var(--card)] lg:p-10 p-3 py-5 rounded-xl">
          <h2 className="text-3xl font-bold text-[var(--brown)] mb-4">
            Why Choose Us
          </h2>
          <p className="text-[var(--text)] max-w-xl mx-auto mb-12">
            Trusted by thousands of families for authentic rituals, transparent
            pricing, and seamless booking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="bg-[var(--background)] rounded-xl shadow-sm hover:shadow-md transition p-6"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2 flex justify-center">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text)] flex justify-center text-center">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
