import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "/src/index.css";

//LogRocket. (2023). React Calendar Tutorial: Build and Customize a Calendar. Available at: https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/ (Accessed: 14 November 2024).

type DateValue = Date | [Date, Date] | null;

function SelectBooking() {
  const [date, setDate] = useState<DateValue>(new Date());

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    setDate(value as DateValue);
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const today = new Date();
      if (Array.isArray(date) && date.length === 2) {
        const [start, end] = date;
        if (date >= start && date <= end) {
          return "bg-white text-black";
        }
        if (date.getMonth() !== today.getMonth()) {
          return "text-gray-400";
        }
      } else if (date instanceof Date) {
        if (date.toDateString() === today.toDateString()) {
          return "bg-white text-black rounded-full";
        }
        if (date.getMonth() !== today.getMonth()) {
          return "text-gray-400";
        }
      }
    }
    return null;
  };
  return (
    <div className="mt-40 max-w-10/12 md:w-8/12 mx-auto mb-40">
      <h2 className="text-center text-2xl font-bold mb-4">
        Book Accommodation
      </h2>
      <div className="">
        <Calendar
          onChange={handleDateChange}
          value={date}
          selectRange={true}
          tileClassName={tileClassName}
          className="react-calendar"
        />
      </div>
      {Array.isArray(date) ? (
        <div className="text-center mt-4 text:small md:text-large">
          <div className="flex flex-col md:flex-row justify-center align-center items-center gap-2">
            <span className="font-bold bg-theme-blue text-white px-2 py-1 rounded-full mx-2">
              Start:
            </span>
            {date[0].toDateString()}

            <span className="font-bold bg-theme-blue text-white px-2 py-1 rounded-full mx-2">
              End:
            </span>
            {date[1].toDateString()}
          </div>
        </div>
      ) : date ? (
        <p className="text-center mt-4">
          <span className="font-bold bg-theme-blue text-white px-2 py-1 rounded-full">
            Selected date:
          </span>
          {date.toDateString()}
        </p>
      ) : (
        <p className="text-center mt-4">No date selected</p>
      )}
    </div>
  );
}

export default SelectBooking;
