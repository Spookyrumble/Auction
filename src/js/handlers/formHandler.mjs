import { loginURL, registerURL } from "../API/constants/urls.mjs";
import { loginUser } from "../API/auth/login.mjs";
import { registerUser } from "../API/auth/registerUser.mjs";

export function formHandler() {
  const loginForm = document.querySelector("#loginForm");
  const registerForm = document.querySelector("#registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData);
      const response = await loginUser(loginURL, data);
      console.log(response, data);
      if (response.success) {
        window.location.href = "/src/HTML/auction/index.html";
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData);
      const response = await registerUser(registerURL, data);
      console.log(response, data);
      if (response.success) {
        window.location.href = "/src/HTML/auction/index.html";
      }
    });
  }
}
