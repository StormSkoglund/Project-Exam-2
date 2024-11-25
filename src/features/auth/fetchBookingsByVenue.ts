import { apiUrl, venueEndpoint, apiKey } from "../../utils/baseUrlAndEndpoints";
import useMyStore from "../../store";

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
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  bookings: Booking[];
}

export async function fetchVenueWithBookings(venueId: string): Promise<Venue> {
  const { accessToken } = useMyStore.getState();
  const url = `${apiUrl}${venueEndpoint}/${venueId}?_bookings=true`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": apiKey,
  };

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
