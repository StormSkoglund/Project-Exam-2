import { apiKey, apiUrl, venues } from "../../utils/baseUrlAndEndpoints";
import useMyStore from "../../store";
import { CreateVenueType } from "./createvenueSchema";

export async function postCreateVenue(createvenue: CreateVenueType) {
  const { accessToken } = useMyStore.getState();
  const response = await fetch(apiUrl + venues, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(createvenue),
  });

  const json = await response.json();
  console.log(response);

  if (!response.ok) {
    console.error(
      "Error creating venue:",
      json.errors?.[0]?.message || "These was an error creating the venue"
    );
    throw new Error(
      json.errors?.[0]?.message || "There was an error creating the venue"
    );
  }

  return json;
}
