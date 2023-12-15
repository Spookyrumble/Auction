/**
 * Registers a user by sending a POST request to the specified URL with the provided object data.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} object - The data object to be sent in the request body.
 * @returns {Promise<object>} - A promise that resolves to the JSON response from the server, or rejects with an error.
 */
export async function registerUser(url, object) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });

    const json = await response.json();

    if (json.statusCode === 400) {
      alert(
        "There was an error registering the user. \n Please check the following: \n\n- Name can only use a-Z, 0-9, and _ \n- Password must be at least 8 characters long \n- Only noroff.no emails are allowed to register."
      );
    } else {
      return json;
    }
  } catch (error) {
    console.log(error);
  }
}
