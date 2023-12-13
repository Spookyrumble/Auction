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
        btn.textContent = " Success!";
        window.location.href = "/src/HTML/auction/index.html";
      }
    } else {
      loader.classList.remove("visually-hidden");
      btn.textContent = " Wait";
      const response = await registerUser(registerURL, data);

      if (response.id) {
        loader.classList.add("visually-hidden");
        btn.textContent = "Success!";
        loader.classList.remove("visually-hidden");
        btn.textContent = " Logging in...";
        const password = document.getElementById("passwordInput").value;
        const newUser = {
          email: response.email,
          password: password,
        };
        console.log(newUser);

        const loginResponse = await loginUser(loginURL, newUser);
        if (loginResponse.success) {
          loader.classList.add("visually-hidden");
          btn.textContent = " Success!";
          window.location.href = "/src/HTML/auction/index.html";
        } else {
          loader.classList.add("visually-hidden");
          btn.textContent = " Login failed";
        }
      }
    }
  });
}
