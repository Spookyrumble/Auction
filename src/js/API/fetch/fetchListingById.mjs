import { apiFetch } from "./authorizedFetch.mjs";
import { openListingsURL } from "../constants/urls.mjs";

export async function fetchById(id) {
  try {
    const response = await apiFetch(
      `${openListingsURL}/${id}?_bids=true&_seller=true`,
      "GET"
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
