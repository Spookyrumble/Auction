export async function registerUser(url) {
  const form = document.getElementById("#registerForm");
  const userObject = new FormData(form);

  try {
    const response = await fetch(url, {
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
