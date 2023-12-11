const baseURL = "https://api.noroff.dev/api/v1/auction";
const openListingsURL = `${baseURL}/listings`;

export async function fetchOpenListings() {
  const response = await fetch(`${openListingsURL}?sort=created&_active=true`);
  const data = await response.json();
  return data;
}
