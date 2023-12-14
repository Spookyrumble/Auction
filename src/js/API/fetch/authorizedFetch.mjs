/**
 * Makes an authorized fetch request to the specified URL using the provided fetch method and optional request body.
 * @param {string} url - The URL to fetch.
 * @param {string} fetchMethod - The fetch method to use (e.g., "GET", "POST", "PUT", "DELETE").
 * @param {Object|null} body - The request body (optional).
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the fetch request.
 */
export async function apiFetch(url, fetchMethod, body = null) {
  const token = localStorage.getItem("accessToken");

  try {
    const options = {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
