import * as React from "react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const CustomCalendar = ({ markedDates, setMarkedDates }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDayClick = (date) => {
    const selected = date.format("YYYY-MM-DD");
    const choice = prompt(
      `Mark ${selected} as (holiday/working):`
    )?.toLowerCase();

    if (choice === "holiday" || choice === "working") {
      setMarkedDates((prev) => ({
        ...prev,
        [selected]: choice,
      }));
    } else if (choice === "") {
      const updated = { ...markedDates };
      delete updated[selected];
      setMarkedDates(updated);
    } else if (choice) {
      alert("❗ Invalid input. Please enter 'holiday' or 'working'");
    }

    setSelectedDate(date);
  };

  return (
    <Box className="bg-white rounded-lg shadow p-5">
      <Typography
        variant="h6"
        className="text-gray-700 mb-4 flex items-center gap-2"
        style={{ fontWeight: 600 }}
      >
        <i className="fa-regular fa-calendar-days"></i> Calendar (Click to mark
        Off Days)
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={selectedDate} onChange={handleDayClick} />
      </LocalizationProvider>

      <p className="text-xs text-gray-500 mt-2">
        * Click on a date to mark as a{" "}
        <span className="text-red-500 font-semibold">Holiday</span> or{" "}
        <span className="text-green-600 font-semibold">Working Day</span>.
      </p>
    </Box>
  );
};

export default CustomCalendar;
