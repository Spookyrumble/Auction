import { loginURL, registerURL } from "../API/constants/urls.mjs";
import { loginUser } from "../API/auth/login.mjs";
import { registerUser } from "../API/auth/registerUser.mjs";

export function formHandler() {
  const loginForm = document.getElementById("loginForm");
  const username = document.getElementById("username");
  const loader = document.getElementById("registerBtnSpinner");
  const btn = document.getElementById("submitBtn");

  loginForm.addEventListener("submit", async (e) => {
    loader.classList.remove("visually-hidden");
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);
    if (username.classList.contains("collapse")) {
      const response = await loginUser(loginURL, data);
      if (response.success) {
        loader.classList.add("visually-hidden");
        btn.textContent = "Success!";
        window.location.href = "/src/HTML/auction/index.html";
      }
    } else {
      const response = await registerUser(registerURL, data);
      if (response.success) {
        loader.classList.add("visually-hidden");
        btn.textContent = "Success!";
        window.location.href = "/src/HTML/auction/index.html";
      }
    }
  });
}
