"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const DashboardSchedule = () => {
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
      startDate: info.dateStr,
      startTime: "",
      endDate: info.dateStr,
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
      title: event.title.replace(/ \(.*\)$/, ""),
      startDate: start.toISOString().split("T")[0],
      startTime: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
      endDate: end.toISOString().split("T")[0],
      endTime: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
      mode: event.extendedProps.mode || "",
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
      mode: "",
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
    const { title, startDate, startTime, endDate, endTime, mode } = newEvent;
    if (!title || !startDate || !startTime || !endDate || !endTime || !mode) {
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
                title: `${title} (${mode})`,
                start,
                end,
                mode,
              }
            : ev
        )
      );
    } else {
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          title: `${title} (${mode})`,
          start,
          end,
          color: "var(--brown)",
          display: "block",
          mode,
        },
      ]);
    }

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
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--card)] p-6 overflow-hidden">
        <div className="flex items-center gap-2 mb-4">

        <h2 className="text-xl font-bold text-[var(--brown)]">
          Schedule
        </h2>
      </div>
      <div className="h-[600px] overflow-hidden">
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

              {formError && <p className="text-red-600 mt-2 text-sm">{formError}</p>}

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
};

export default DashboardSchedule;

