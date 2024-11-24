import { apiUrl } from "../../utils/baseUrlAndEndpoints";
import { registerEndpoint } from "../../utils/baseUrlAndEndpoints";
interface User {
  name: string;
  email: string;
  password: string;
  avatar: {
    url: string;
    alt: string;
  };
}

export async function postUserRegister(user: User) {
  const response = await fetch(apiUrl + registerEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const json = await response.json();
  console.log(response);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }

  return json;
}
