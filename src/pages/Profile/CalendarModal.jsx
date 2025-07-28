import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const attendanceData = {
  "2025-07-10": ["Aarav", "Ishita", "Sneha"],
  "2025-07-11": ["Rohan", "Sneha"],
};

const paymentData = {
  "2025-07-10": ["Ishita", "Sneha"],
  "2025-07-11": ["Aarav"],
};

const CalendarModal = ({ date, onClose }) => {
  const dateStr = date.format("YYYY-MM-DD");

  return (
    <Modal open onClose={onClose}>
      <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-24 shadow-lg">
        <Typography variant="h6" className="mb-4 font-bold text-gray-800">
          📅 {date.format("DD MMMM YYYY")}
        </Typography>

        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            ✅ Attendance:
          </h3>
          {attendanceData[dateStr]?.length > 0 ? (
            <ul className="list-disc pl-5 text-sm">
              {attendanceData[dateStr].map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No data available</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            💰 Payments:
          </h3>
          {paymentData[dateStr]?.length > 0 ? (
            <ul className="list-disc pl-5 text-sm">
              {paymentData[dateStr].map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No payments made</p>
          )}
        </div>

        <div className="text-right">
          <button
            onClick={() => alert("🔔 Email reminder scheduled!")}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
          >
            Schedule Email Reminder
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default CalendarModal;
