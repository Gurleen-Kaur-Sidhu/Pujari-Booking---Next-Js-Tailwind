"use client";
import React, { useState } from "react";

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots.map((t) => {
    const h = parseInt(t.split(":")[0], 10);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${t.split(":")[1]} ${suffix}`;
  });
};

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = generateTimeSlots();

export default function ManageAvailability() {
  const [availability, setAvailability] = useState({});

  const toggleSlot = (day, time) => {
    setAvailability((prev) => {
      const daySlots = new Set(prev[day] || []);
      if (daySlots.has(time)) {
        daySlots.delete(time);
      } else {
        daySlots.add(time);
      }
      return { ...prev, [day]: Array.from(daySlots) };
    });
  };

  const handleUpdate = () => {
    console.log("Selected availability:", availability);
    alert("Availability updated!");
  };

  return (
    <div className="h-screen w-full bg-[var(--card)] p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold text-[var(--brown)]">
        Weekly Availability
      </h2>
       <div className="text-center flex items-center justify-center">
        <button
          onClick={handleUpdate}
          className="custom-button "
        >
          Update Availability
        </button>
      </div>
      </div>

      {weekdays.map((day) => (
        <div key={day} className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-[var(--text)]">{day}</h3>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => {
              const isSelected = availability[day]?.includes(slot);
              return (
                <button
                  key={slot}
                  onClick={() => toggleSlot(day, slot)}
                  className={`min-w-[90px] text-center px-3 py-1 border rounded ${
                    isSelected
                      ? "bg-[var(--brown)] text-white"
                      : "bg-white border-gray-400 text-[var(--text)]"
                  } hover:shadow-sm transition text-sm`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      ))}

     
    </div>
  );
}
