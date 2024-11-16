import { useQuery } from "react-query";
import { Venue } from "./useFetchedVenues";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchVenue = async (id: string): Promise<Venue> => {
  const response = await fetch(`${apiUrl}holidaze/venues/${id}`);
  if (!response.ok) {
    throw new Error("No response received, try again later.");
  }
  const result = await response.json();
  return result.data;
};

function useApiQuery(id: string | undefined) {
  return useQuery<Venue>(
    ["venue", id],
    () => {
      if (!id) {
        throw new Error("ID is undefined");
      }
      return fetchVenue(id);
    },
    {
      staleTime: Infinity,
      enabled: !!id,
    }
  );
}

export default useApiQuery;
