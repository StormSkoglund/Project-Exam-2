import { useQuery } from "@tanstack/react-query";
import { apiUrl, venues } from "../utils/baseUrlAndEndpoints";

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
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  location: {
    address: string | null;
    city: string | null;
    zip: string | null;
    country: string | null;
    continent: string | null;
    lat: number | null;
    lng: number | null;
  };
  _count: { bookings: number };
}

const fetchAllVenuesSearch = async (query: string): Promise<Venue[]> => {
  if (!query) {
    return [];
  }
  let allVenues: Venue[] = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage && currentPage <= totalPages) {
    const response = await fetch(
      `${apiUrl}${venues}/search?q=${query}&page=${currentPage}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch venues");
    }

    const result = await response.json();
    allVenues = [...allVenues, ...result.data];
    currentPage = result.meta.nextPage;
    totalPages = result.meta.pageCount;
  }

  return allVenues;
};

function useFetchedVenuesSearch(query: string = "") {
  return useQuery<Venue[]>({
    queryKey: ["venues", query],
    queryFn: () => fetchAllVenuesSearch(query),
    staleTime: Infinity,
  });
}

export default useFetchedVenuesSearch;
