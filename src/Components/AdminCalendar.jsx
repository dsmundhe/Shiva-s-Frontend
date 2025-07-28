import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/calendar.css";
import { CalendarDays } from "lucide-react";
import "./calendar.css";

const AdminCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const handleDayClick = (clickedDate) => {
    const formatted = clickedDate.toISOString().split("T")[0];
    setSelectedDate(formatted);
    setSelectedType(markedDates[formatted] || "");
    setShowModal(true);
  };

  const applyDateType = () => {
    if (!selectedType) return;

    setMarkedDates((prev) => ({
      ...prev,
      [selectedDate]: selectedType,
    }));
    setShowModal(false);
  };

  const tileClassName = ({ date }) => {
    const formatted = date.toISOString().split("T")[0];
    if (markedDates[formatted] === "holiday") return "holiday-tile";
    if (markedDates[formatted] === "working") return "working-tile";
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 w-full">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <CalendarDays className="w-5 h-5" />
        Calendar (Click to mark days)
      </h2>

      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
        onClickDay={handleDayClick}
        className="w-full custom-calendar"
      />

      <p className="text-xs text-gray-500 mt-2">
        * Click a date to mark it as{" "}
        <span className="text-red-400 font-semibold">Holiday</span> or{" "}
        <span className="text-green-500 font-semibold">Working Day</span>.
      </p>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg animate-fadeIn">
            <h3 className="text-lg font-bold mb-4">Mark {selectedDate}</h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  value="holiday"
                  checked={selectedType === "holiday"}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="accent-red-400"
                />
                <span className="text-red-500 font-medium">Holiday</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  value="working"
                  checked={selectedType === "working"}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="accent-green-400"
                />
                <span className="text-green-500 font-medium">Working Day</span>
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={applyDateType}
                className="px-4 py-2 bg-[#862627] text-white rounded hover:bg-[#701d21]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
