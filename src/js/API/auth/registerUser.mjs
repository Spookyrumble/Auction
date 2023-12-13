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
