import { baseURL, registerURL } from "./API/constants/urls.mjs";

const form = document.getElementById("#registerForm");

export async function createNewUser() {
  const userObject = new FormData(form);

  try {
    const response = await fetch(`${baseURL}/${registerURL}`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
