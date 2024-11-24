import { useParams } from "react-router-dom";
import useVenueWithBookings from "../../../../hooks/useVenueWithBookings";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

function BookedDates() {
  const { venueId } = useParams<{ venueId: string }>();
  const {
    data: venue,
    isLoading,
    isError,
  } = useVenueWithBookings(venueId || "");

  if (!venueId) {
    return <div>Error: Venue ID not found</div>;
  }

  if (isLoading) {
    return <div>Loading booked dates...</div>;
  }

  if (isError) {
    return <div>Error loading booked dates...</div>;
  }

  if (!venue?.bookings) {
    return <div>No bookings found</div>;
  }

  return (
    <div>
      <h3>Booked Dates</h3>
      <ul>
        {venue.bookings.map((booking: Booking) => (
          <li key={booking.id}>
            {booking.dateFrom} to {booking.dateTo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookedDates;
