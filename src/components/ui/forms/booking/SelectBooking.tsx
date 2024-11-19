//LogRocket. (2023). React Calendar Tutorial: Build and Customize a Calendar. Available at: https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/ (Accessed: 14 November 2024).
import { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { useParams } from "react-router-dom";
import useVenueWithBookings from "../../../../hooks/useVenueWithBookings";
import "/src/index.css";
import {
  apiKey,
  apiUrl,
  bookings,
} from "../../../../utils/baseUrlAndEndpoints";
import useMyStore from "../../../../store";

type DateValue = Date | [Date, Date] | null;

interface Booking {
  id?: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
  created?: string;
  updated?: string;
}

interface VenueBooking {
  id?: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created?: string;
  updated?: string;
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
  const [guests, setGuests] = useState<number>(1);

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

    const result = venue.bookings.some((booking: VenueBooking) => {
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
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        console.log(today);
        return "bg-white border-dashed border-2 border-theme-green text-black rounded-full font-bold";
      }
      if (isDateBooked(date)) {
        console.log(`Date: ${date.toDateString()} is booked`);
        return "bg-red-400 text-white rounded-full";
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

  const createBooking = async (booking: Booking) => {
    const { accessToken } = useMyStore.getState();
    console.log("Access Token:", accessToken);
    console.log("API Key:", apiKey);
    console.log("Booking Data:", booking);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    };

    console.log("Headers:", headers);

    try {
      const response = await fetch(`${apiUrl}${bookings}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(booking),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create booking: ${response.status} ${response.statusText} - ${errorText}`
        );
      }
      console.log("Booking created successfully");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleBooking = () => {
    if (!venueId) {
      console.error("Venue ID is undefined");
      return;
    }

    if (Array.isArray(date)) {
      const [start, end] = date;
      const booking: Booking = {
        dateFrom: start.toISOString(),
        dateTo: end.toISOString(),
        guests: guests,
        venueId: venueId as string,
      };
      createBooking(booking);
    } else if (date) {
      const booking: Booking = {
        dateFrom: date.toISOString(),
        dateTo: date.toISOString(),
        guests: guests,
        venueId: venueId as string,
      };
      createBooking(booking);
    }
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
      <div className="mt-5 p-5 font-medium text-slate-800">
        -Dates highlighted in red are unavailable for booking.
      </div>
      <div className="mb-2 p-5 font-medium text-slate-800">
        -Today's date is highlighted with a green dashed border. Click to select
        a start date, then an end date to book multiple days.
      </div>
      <div className="">
        <Calendar
          onChange={handleDateChange}
          value={date}
          minDate={new Date()}
          selectRange={true}
          tileClassName={tileClassName}
          tileDisabled={tileDisabled}
          className="react-calendar"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="guests"
          className="text-sm font-medium text-slate-800 block w-2/6 mx-auto"
        >
          Number of Guests
        </label>
        {venue && (
          <input
            type="number"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            min="1"
            max={venue.maxGuests}
            className="mt-1 block w-1/6 mx-auto px-3 py-2 border text-center font-bold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-theme-blue focus:border-theme-blue sm:text-sm"
          />
        )}
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
      <div className="text-center">
        <button
          onClick={handleBooking}
          className="mt-4 bg-theme-green text-white py-3 px-5 rounded hover:shadow-2xl hover:bg-green-800"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default SelectBooking;
