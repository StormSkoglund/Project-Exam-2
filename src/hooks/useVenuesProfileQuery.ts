import { useQuery } from "@tanstack/react-query";
import useMyStore from "../store";
import { apiKey, apiUrl, profilesEndpoint } from "../utils/baseUrlAndEndpoints";

interface QueryParams {
  _bookings?: string | boolean;
  _owner?: string | boolean;
  [key: string]: string | boolean | undefined;
}

const fetchVenuesProfile = async (queryParams: QueryParams = {}) => {
  const { accessToken } = useMyStore.getState();
  const user = useMyStore.getState().user;
  const userName = user?.name;
  if (!userName) {
    throw new Error("User name is undefined");
  }

  const queryParamsWithStrings = Object.fromEntries(
    Object.entries(queryParams).map(([key, value]) => [key, String(value)])
  );

  const queryString = new URLSearchParams(queryParamsWithStrings).toString();
  const url = `${apiUrl}${profilesEndpoint}/${userName}/venues${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error("No response received, try again later.");
  }
  const result = await response.json();
  return result.data;
};

function useVenuesProfileQuery(queryParams: QueryParams = {}) {
  return useQuery({
    queryKey: ["venues", queryParams],
    queryFn: () => fetchVenuesProfile(queryParams),
    staleTime: 0,
    enabled: true,
  });
}

export default useVenuesProfileQuery;
