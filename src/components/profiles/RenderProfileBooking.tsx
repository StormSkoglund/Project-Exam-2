import React, { useEffect, useState } from "react";
import getBookingsByProfile from "../../features/auth/getBookingsByProfile";
import moment from "moment";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

const RenderProfileBooking: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByProfile();

        const data = await response.json();
        console.log("Parsed Data:", data);
        setBookings(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bookings for this profile:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching bookings</div>;
  }

  return (
    <>
      <div className="border-solid border-2 flex flex-col justify-between items-center p-2">
        <div className="text-xl font-normal">Upcoming Bookings</div>

        <div>
          {bookings.length === 0 ? (
            <p>No Bookings Yet</p>
          ) : (
            bookings.map((booking) => (
              <div
                className="flex flex-col justify-start align-middle items-start w-fit container mb-5 bg-theme-blue rounded-md mx-auto p-5"
                key={booking.id}
              >
                <p className="text-white font-bold p-2">Booking ID: </p>
                <p className="text-white p-2">{booking.id}</p>
                <p className="text-white p-2 font-semibold">From: </p>
                <p className="text-white p-2">
                  {moment(booking.dateFrom).format("YYYY-MM-DD ")}
                </p>
                <p className="text-white p-2 font-semibold">To: </p>
                <p className="text-white p-2">
                  {moment(booking.dateTo).format("YYYY-MM-DD")}
                </p>
                <p className="text-white p-2 font-semibold">Guests: </p>
                <p className="text-white p-2"> {booking.guests}</p>
                <p className="text-white p-2 font-semibold">Created: </p>
                <p className="text-white p-2">
                  {moment(booking.created).format("YYYY-MM-DD HH:mm:ss")}
                </p>
                <p className="text-white p-2 font-semibold">Updated:</p>
                <p className="text-white p-2">
                  {moment(booking.updated).format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default RenderProfileBooking;
