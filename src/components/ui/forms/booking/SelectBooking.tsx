//LogRocket. (2023). React Calendar Tutorial: Build and Customize a Calendar. Available at: https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/ (Accessed: 14 November 2024).
import { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { useParams } from "react-router-dom";
import useVenueWithBookings from "../../../../hooks/useVenueWithBookings";
import "/src/index.css";

type DateValue = Date | [Date, Date] | null;

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

function SelectBooking() {
  const { venueId } = useParams<{ venueId: string }>();
  const {
    data: venue,
    isLoading,
    isError,
    refetch,
  } = useVenueWithBookings(venueId || "");
  const [date, setDate] = useState<DateValue>(null);

  useEffect(() => {
    if (venue) {
      console.log("Venue data:", venue);
    }
  }, [venue]);

  useEffect(() => {
    if (!venue) {
      refetch();
    }
  }, [venue, refetch]);

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (Array.isArray(value)) {
      const [start, end] = value;
      if (start && end) {
        const isRangeBooked = isRangeContainsBookedDates(start, end);
        if (isRangeBooked) {
          console.log("Selected range contains booked dates");
          return;
        }
      }
    }
    setDate(value as DateValue);
  };

  const isDateBooked = (date: Date) => {
    if (!venue || !venue.bookings) {
      console.log("Venue or bookings data is not available");
      return false;
    }

    const result = venue.bookings.some((booking: Booking) => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);
      return date >= bookingStart && date <= bookingEnd;
    });

    console.log(`Date: ${date.toDateString()}, Booked: ${result}`);
    return result;
  };

  const isRangeContainsBookedDates = (start: Date, end: Date) => {
    const currentDate = new Date(start);
    while (currentDate <= end) {
      if (isDateBooked(currentDate)) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      if (isDateBooked(date)) {
        console.log(`Date: ${date.toDateString()} is booked`);
        return "bg-red-400 text-white rounded-full";
      }
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        return "bg-white text-black rounded-full";
      }
      if (date.getMonth() !== today.getMonth()) {
        return "text-gray-400";
      }
    }
    return null;
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      return isDateBooked(date);
    }
    return false;
  };

  if (isLoading) {
    return <div>Loading booked dates...</div>;
  }

  if (isError) {
    return <div>Error loading booked dates...</div>;
  }

  if (!venue || !venue.bookings) {
    refetch();
  }

  return (
    <div className="mt-40 max-w-10/12 md:w-8/12 mx-auto mb-40">
      <h2 className="text-center text-2xl font-bold mb-4">
        Book Accommodation
      </h2>
      <p className="font-bold text-slate-700 px-2 py-1 m-5 p-5">
        Dates marked in red are already booked and cannot be selected.
      </p>
      <div className="">
        <Calendar
          onChange={handleDateChange}
          value={date}
          selectRange={true}
          tileClassName={tileClassName}
          tileDisabled={tileDisabled}
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
          <span className="font-bold bg-theme-blue text-white px-2 py-1 rounded-full mx-2">
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
