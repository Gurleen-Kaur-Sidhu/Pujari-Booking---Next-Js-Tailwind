"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarDays, CreditCard, Info } from "lucide-react";
import timeGridPlugin from "@fullcalendar/timegrid";

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

export default function BookNowPage() {
  const { id } = useParams();
  const pujari = pandits.find((p) => p.id === id);
  const todayDateStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [formError, setFormError] = useState("");

  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    mode: "",
  });

  const handleDateClick = (info) => {
    const clickedDate = new Date(info.dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (clickedDate < today) return;

    setNewEvent({
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      mode: "",
    });
    setEditingEventId(null);
    setFormError("");
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    const event = info.event;
    const start = new Date(event.start);
    const end = new Date(event.end);
    const pad = (n) => String(n).padStart(2, "0");

    setNewEvent({
      title: event.title,
      startDate: start.toISOString().split("T")[0],
      startTime: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
      endDate: end.toISOString().split("T")[0],
      endTime: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
    });
    setEditingEventId(event.id);
    setFormError("");
    setModalOpen(true);
  };

  const handleDeleteEvent = () => {
    if (!editingEventId) return;
    setEvents((prevEvents) =>
      prevEvents.filter((ev) => (ev.id || ev._def?.publicId) !== editingEventId)
    );
    setModalOpen(false);
    setEditingEventId(null);
    setNewEvent({
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    });
    setFormError("");
  };

  const isOverlapping = (newStart, newEnd, eventId) => {
    const start = new Date(newStart).getTime();
    const end = new Date(newEnd).getTime();
    return events.some((ev) => {
      const evStart = new Date(ev.start).getTime();
      const evEnd = new Date(ev.end).getTime();
      return (
        start < evEnd &&
        end > evStart &&
        !(end <= evStart || start >= evEnd) &&
        (eventId === null || ev.id !== eventId)
      );
    });
  };

  const handleAddEvent = () => {
    const { title, startDate, startTime, endDate, endTime } = newEvent;
    if (
      !title ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime ||
      !newEvent.mode
    ) {
      setFormError("Please fill in all fields including mode.");
      return;
    }

    const start = `${startDate}T${startTime}`;
    const end = `${endDate}T${endTime}`;
    const startDateTime = new Date(start);
    const endDateTime = new Date(end);

    if (endDateTime <= startDateTime) {
      setFormError("End time must be after start time.");
      return;
    }

    if (isOverlapping(start, end, editingEventId)) {
      setFormError("Time slot is already booked.");
      return;
    }

    if (editingEventId) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEventId
            ? {
                ...ev,
                title: `${title} (${newEvent.mode})`,
                start,
                end,
                mode: newEvent.mode,
              }
            : ev
        )
      );
    } else {
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          title: `${title} (${newEvent.mode})`, // show mode in title
          start,
          end,
          color: "var(--brown)",
          display: "block",
          mode: newEvent.mode,
        },
      ]);
    }
    setNewEvent({
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    });
    setEditingEventId(null);
    setFormError("");
    setModalOpen(false);
  };

  if (!pujari) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
        <h2 className="text-xl font-bold text-red-700">
          No Pujari found for ID: <span className="text-gray-800">{id}</span>
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] min-h-screen px-4 py-10 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[var(--brown)] mb-3">
          Book a Pujari
        </h2>
        <p className="text-[var(--text)] max-w-xl mx-auto">
          Invite divine blessings into your home by booking a trusted Pujari
          today.
        </p>
      </div>

      <div className="max-w-8xl mx-auto space-y-5">
        {/* Calendar */}
        <div className="bg-[var(--card)] p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays size={20} className="text-[var(--brown)]" />
            <h2 className="text-lg font-bold text-[var(--brown)]">
              Availability Calendar
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#444] mb-4 bg-[var(--background)] p-3 rounded-md">
            <Info size={16} className="text-[var(--brown)]" />
            <span>
              Click on a date in the calendar to add your event. Book your slot
              before someone else does!
            </span>
          </div>
          <div className="h-[800px] overflow-hidden">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate={todayDateStr}
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              height="100%"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              dayCellDidMount={(arg) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const cellDate = new Date(arg.date);
                cellDate.setHours(0, 0, 0, 0);
                if (cellDate < today) {
                  arg.el.style.opacity = "0.7";
                  arg.el.style.pointerEvents = "none";
                  arg.el.style.backgroundColor = "rgb(233 233 233)";
                }
              }}
            />
          </div>
          {/* {selectedDate && (
            <p className="mt-3 text-sm text-green-700 font-medium">
              Selected Date: {selectedDate}
            </p>
          )} */}
        </div>

        <Link href="/checkout">
          <button className="cursor-pointer flex items-center gap-2 bg-[var(--brown)] hover:bg-[#7f1616] text-white px-6 py-3 rounded-full font-semibold transition">
            <CreditCard size={18} /> Pay & Confirm Booking
          </button>
        </Link>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-[var(--card)] rounded-xl p-6 shadow-2xl w-full max-w-md z-50">
            <h3 className="text-2xl font-bold mb-4 text-[var(--brown)]">
              {editingEventId ? "Edit Event" : "Add New Event"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[var(--text)] mb-1">
                  Mode
                </label>
                <select
                  value={newEvent.mode}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, mode: e.target.value })
                  }
                  className="w-full p-3 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brown)] text-[var(--text)]"
                >
                  <option value="">Select Mode</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--text)] mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full p-3 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brown)] text-[var(--text)] placeholder:text-gray-400"
                />
              </div>

              {/* Start Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-[var(--text)] mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.startDate}
                    min={todayDateStr}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startDate: e.target.value })
                    }
                    className="w-full p-3 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brown)] text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--text)] mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                    className="w-full p-3 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brown)] text-[var(--text)]"
                  />
                </div>
              </div>

              {/* End Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-[var(--text)] mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.endDate}
                    min={todayDateStr}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endDate: e.target.value })
                    }
                    className="w-full p-3 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brown)] text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--text)] mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    className="w-full p-3 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brown)] text-[var(--text)]"
                  />
                </div>
              </div>

              {/* Error Message */}
              {formError && (
                <p className="text-red-600 mt-2 text-sm">{formError}</p>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full transition"
                >
                  Cancel
                </button>

                <div className="space-x-3">
                  {editingEventId && (
                    <button
                      onClick={handleDeleteEvent}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    onClick={handleAddEvent}
                    className="bg-[var(--brown)] hover:bg-[#7f1616] text-white px-4 py-2 rounded-full transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
