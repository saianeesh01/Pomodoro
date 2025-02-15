import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <h2 className="text-accent">Schedule Your Focus Sessions</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} className="calendar" />
    </div>
  );
};

export default CalendarScheduler;
