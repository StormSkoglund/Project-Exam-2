import useMyStore from "../../store";
import { apiKey, apiUrl, venueEndpoint } from "../../utils/baseUrlAndEndpoints";
import { UpdateVenueType } from "./updateVenueSchema";

const UpdateVenueAuth = async (venueId: string, data: UpdateVenueType) => {
  const { accessToken } = useMyStore.getState();

  const response = await fetch(`${apiUrl}${venueEndpoint}/${venueId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update venue");
  }

  return response.json();
};

export default UpdateVenueAuth;
