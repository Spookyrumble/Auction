import { userURL } from "../constants/urls.mjs";

export async function userFetch() {
  const user = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");
  const flag = "?_listings=true";

  const response = await fetch(`${userURL}/${user}/${flag}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return json;
}