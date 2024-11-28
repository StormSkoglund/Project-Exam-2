import { useQuery } from "@tanstack/react-query";
import useMyStore from "../store";
import { apiKey, apiUrl, profilesEndpoint } from "../utils/baseUrlAndEndpoints";

const fetchProfile = async () => {
  const { accessToken } = useMyStore.getState();
  const user = useMyStore.getState().user;
  const userName = user?.name;
  if (!userName) {
    throw new Error("User name is undefined");
  }
  const response = await fetch(`${apiUrl}${profilesEndpoint}/${userName}`, {
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

function useProfileQuery() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
    enabled: true,
  });
}

export default useProfileQuery;
