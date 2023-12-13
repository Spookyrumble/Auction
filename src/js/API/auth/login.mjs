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
      console.log(json);
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
