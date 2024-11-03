interface LoginUser {
  email: string;
  password: string;
}

export async function postUserLogin(
  user: LoginUser
): Promise<{ token: string }> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const loginEndpoint = import.meta.env.VITE_API_ENDPOINT_LOGIN;

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

  return json;
}
