import { useParams } from "react-router-dom";
import useVenueWithBookings from "../../../../hooks/useVenueWithBookings";
import { useState } from "react";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

function DateSelection() {
  const { venueId } = useParams<{ venueId: string }>();
  const { data: venue } = useVenueWithBookings(venueId || "");
  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateTo, setSelectedDateTo] = useState("");

  const isDateAvailable = (dateFrom: string, dateTo: string) => {
    return (
      venue?.bookings &&
      !venue.bookings.some(
        (booking: Booking) =>
          (dateFrom >= booking.dateFrom && dateFrom <= booking.dateTo) ||
          (dateTo >= booking.dateFrom && dateTo <= booking.dateTo)
      )
    );
  };

  const handleBooking = () => {
    if (isDateAvailable(selectedDateFrom, selectedDateTo)) {
      return "";
    } else {
      return "";
    }
  };

  return (
    <div>
      <h3>Select Dates</h3>
      <input
        type="date"
        value={selectedDateFrom}
        onChange={(e) => setSelectedDateFrom(e.target.value)}
      />
      <input
        type="date"
        value={selectedDateTo}
        onChange={(e) => setSelectedDateTo(e.target.value)}
      />
      <button aria-label="Toggle Book Selected Dates" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
}

export default DateSelection;
