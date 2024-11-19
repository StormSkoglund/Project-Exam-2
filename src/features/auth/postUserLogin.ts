import useMyStore from "../../store";
import { apiUrl } from "../../utils/baseUrlAndEndpoints";
import { loginEndpoint } from "../../utils/baseUrlAndEndpoints";

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

  return json.data;
}
