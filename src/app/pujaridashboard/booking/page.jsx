"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarDays, X } from "lucide-react";

const DashboardCalendar = () => {
  const todayDateStr = new Date().toISOString().split("T")[0];

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Griha Pravesh (Online)",
      description: "A sacred ceremony to enter a new house.",
      start: `${todayDateStr}T10:00:00`,
      end: `${todayDateStr}T11:00:00`,
      mode: "Offline",
      location: "Amritsar",
      client: "Rahul Sharma",
      color: "var(--brown)",
    },
    {
      id: "2",
      title: "Puja for Prosperity",
      description: "A puja to bring peace and prosperity.",
      start: `${todayDateStr.split("-")[0]}-${todayDateStr.split("-")[1]}-05T08:00:00`,
      end: `${todayDateStr.split("-")[0]}-${todayDateStr.split("-")[1]}-05T09:00:00`,
      mode: "Offline",
      location: "Delhi",
      client: "Meena Gupta",
      color: "#2563eb",
    },
  ]);

  const handleEventClick = (info) => {
    const event = info.event;
    const eventData = events.find((e) => e.id === event.id);
    setSelectedEvent(eventData);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--card)] p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={20} className="text-[var(--brown)]" />
        <h2 className="text-xl font-bold text-[var(--brown)]">
          Availability Calendar
        </h2>
      </div>

      <div className="h-[600px] overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={todayDateStr}
          events={events}
          eventClick={handleEventClick}
          height="100%"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>

      {/* Event Popup */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-[var(--brown)]"
            >
              <X size={22} />
            </button>
            <h3 className="text-xl font-bold text-[var(--brown)] mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-[var(--text)]">Client:</span>{" "}
              {selectedEvent.client}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-[var(--text)]">Location:</span>{" "}
              {selectedEvent.location}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-[var(--text)]">Mode:</span>{" "}
              {selectedEvent.mode}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-[var(--text)]">Start:</span>{" "}
              {new Date(selectedEvent.start).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-[var(--text)]">End:</span>{" "}
              {new Date(selectedEvent.end).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold text-[var(--text)]">Description:</span>{" "}
              {selectedEvent.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCalendar;
