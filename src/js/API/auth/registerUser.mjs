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
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
