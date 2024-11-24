import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../utils/baseUrlAndEndpoints";
import { venueEndpoint } from "../utils/baseUrlAndEndpoints";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests?: number;
  rating: number;
  created: string;
  updated: string;
  bookings: Booking[];
  location: {
    address: string | null;
    city: string | null;
    zip: string | null;
    country: string | null;
    continent: string | null;
    lat: number | null;
    lng: number | null;
  };
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  _count: {
    bookings: number;
  };
}

const fetchVenueWithBookings = async (venueId: string): Promise<Venue> => {
  const response = await fetch(
    `${apiUrl}${venueEndpoint}/${venueId}?_bookings=true`
  );
  if (!response.ok) {
    throw new Error("No response received, try again later.");
  }
  const result = await response.json();
  return result.data;
};

function useVenueWithBookings(venueId: string) {
  return useQuery<Venue>({
    queryKey: ["venue", venueId],
    queryFn: () => fetchVenueWithBookings(venueId),
    staleTime: Infinity,
  });
}

export default useVenueWithBookings;
