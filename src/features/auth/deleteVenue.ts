import useMyStore from "../../store";
import { apiKey, apiUrl, venueEndpoint } from "../../utils/baseUrlAndEndpoints";

const deleteVenue = async (venueId: string) => {
  const { accessToken } = useMyStore.getState();

  const response = await fetch(`${apiUrl}${venueEndpoint}/${venueId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete venue");
  }

  return response.json();
};

export default deleteVenue;
