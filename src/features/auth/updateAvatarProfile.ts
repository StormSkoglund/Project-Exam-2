import useMyStore from "../../store";
import {
  apiKey,
  apiUrl,
  profilesEndpoint,
} from "../../utils/baseUrlAndEndpoints";

const updateAvatarProfile = async (avatarData: {
  url: string;
  alt: string;
}) => {
  const { accessToken } = useMyStore.getState();
  const user = useMyStore.getState().user;
  const userName = user?.name;
  if (!userName) {
    throw new Error("User name is undefined");
  }

  const response = await fetch(`${apiUrl}${profilesEndpoint}/${userName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({ avatar: avatarData }),
  });

  if (!response.ok) {
    throw new Error("Failed to update avatar");
  }

  const result = await response.json();
  return result.data;
};

export default updateAvatarProfile;
