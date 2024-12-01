import { useQuery } from "@tanstack/react-query";
import useMyStore from "../store";
import { apiKey, apiUrl, profilesEndpoint } from "../utils/baseUrlAndEndpoints";

const fetchProfile = async (queryParams = {}) => {
  const { accessToken } = useMyStore.getState();
  const user = useMyStore.getState().user;
  const userName = user?.name;
  if (!userName) {
    throw new Error("User name is undefined");
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${apiUrl}${profilesEndpoint}/${userName}${
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

function useProfileQuery(queryParams = {}) {
  return useQuery({
    queryKey: ["profile", queryParams],
    queryFn: () => fetchProfile(queryParams),
    staleTime: 0,
    enabled: true,
  });
}

export default useProfileQuery;
