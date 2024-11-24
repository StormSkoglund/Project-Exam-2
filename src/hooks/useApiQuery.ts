import { useQuery } from "@tanstack/react-query";
import { Venue } from "./useFetchedVenues";
import { apiUrl, venueEndpoint } from "../utils/baseUrlAndEndpoints";

const fetchVenue = async (id: string): Promise<Venue> => {
  const response = await fetch(`${apiUrl}${venueEndpoint}/${id}`);
  if (!response.ok) {
    throw new Error("No response received, try again later.");
  }
  const result = await response.json();
  return result.data;
};

function useApiQuery(id: string | undefined) {
  return useQuery<Venue>({
    queryKey: ["venue", id],
    queryFn: () => {
      if (!id) {
        throw new Error("ID is undefined");
      }
      return fetchVenue(id);
    },
    staleTime: Infinity,
    enabled: !!id,
  });
}

export default useApiQuery;
