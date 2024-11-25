import useMyStore from "../../store";
import { apiUrl, loginEndpoint } from "../../utils/baseUrlAndEndpoints";

interface LoginUser {
  email: string;
  password: string;
}

export async function postUserLogin(
  user: LoginUser
): Promise<{ accessToken: string }> {
  const response = await fetch(apiUrl + loginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  console.log("Received Access Token:", json.data.accessToken);
  useMyStore.getState().setAccessToken(json.data.accessToken);

  const userData = {
    name: json.name,
    email: json.email,
    bio: json.bio,
    avatar: json.avatar,
    banner: json.banner,
    venueManager: json.venueManager,
  };

  useMyStore.getState().setUser(userData);

  return { accessToken: json.data.accessToken };
}
