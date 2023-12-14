import { userURL } from "../constants/urls.mjs";

/**
 * Fetches user data from the server.
 * @returns {Promise<Object>} The user data as a JSON object.
 */
export async function userFetch() {
  const userField = document.getElementById("userField");
  if (!localStorage.getItem("accessToken")) {
    userField.classList.add("d-none");
    return;
  } else {
    const user = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");
    const flag = "?_listings=true&sortOrder=asc";
    // const listings = "listings";

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
}
