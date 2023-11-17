const baseURL = "https://api.noroff.dev/api/v1/auction";
const openListingsURL = `${baseURL}/listings`;

export async function fetchOpenListings() {
  const response = await fetch(openListingsURL);
  const data = await response.json();
  console.log(data);
}
