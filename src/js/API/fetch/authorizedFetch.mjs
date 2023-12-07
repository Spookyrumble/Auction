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
