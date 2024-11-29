import useMyStore from "../../store";
import {
  apiKey,
  apiUrl,
  profilesEndpoint,
} from "../../utils/baseUrlAndEndpoints";

const getBookingsByProfile = async () => {
  const { accessToken } = useMyStore.getState();
  const user = useMyStore.getState().user;
  const userName = user?.name;
  if (!userName) {
    throw new Error("User name is undefined");
  }

  const response = await fetch(
    `${apiUrl}${profilesEndpoint}/${userName}/bookings`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return response;
};

export default getBookingsByProfile;
