import { apiFetch } from "./authorizedFetch.mjs";
import { userURL } from "../constants/urls.mjs";

export async function userListing(user) {
  try {
    const response = await apiFetch(
      `${userURL}/${user}/listings?_bids=true`,
      "GET"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
