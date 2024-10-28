import { useQuery } from "react-query";

const apiUrl = import.meta.env.VITE_API_URL;
const venues = import.meta.env.VITE_API_ENDPOINT_VENUES;

const fetchVenues = async () => {
  const response = await fetch(`${apiUrl}${venues}`);
  if (!response.ok) {
    throw new Error("No response received, try again later.");
  }
  const result = await response.json();
  console.log(result);
  return result.data;
};

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string | null;
    city: string | null;
    zip: string | null;
    country: string | null;
    continent: string | null;
    lat: number | null;
    lng: number | null;
  };
  _count: {
    bookings: number;
  };
}

function useFetchedVenues() {
  return useQuery<Venue[]>({
    queryKey: ["venues"],
    queryFn: fetchVenues,
    staleTime: Infinity,
  });
}

export default useFetchedVenues;
