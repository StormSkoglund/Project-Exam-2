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

  useMyStore.getState().setAccessToken(json.data.accessToken);
  useMyStore.getState().setIsLoggedIn(true);

  const userData = {
    name: json.data.name,
    email: json.data.email,
    bio: json.data.bio,
    avatar: json.data.avatar,
    banner: json.data.banner,
    venueManager: json.data.venueManager,
  };

  useMyStore.getState().setUser(userData);

  return { accessToken: json.data.accessToken };
}
