/**
 * Logs in a user by sending a POST request to the specified URL with the provided data.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} data - The data to be sent in the request body.
 * @returns {Promise<{ success: boolean, data?: object }>} - A promise that resolves to an object indicating the success of the login operation and optionally containing additional data.
 */
export async function loginUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const btnLoader = document.getElementById("registerBtnSpinner");

    if (response.ok) {
      const json = await response.json();
      const { accessToken, name } = json;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", name);
      return { success: true, data: json };
    } else {
      console.error("Login failed:", response.status);
      alert(
        "Login failed, please check your username and password and try again."
      );
      btnLoader.classList.add("visually-hidden");
      return { success: false };
    }
  } catch (error) {
    console.log("There was an error authenticating the user", error);
  }
}
