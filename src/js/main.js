/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import { baseURL, loginURL, registerURL } from "./API/constants/urls.mjs";
import { loginUser } from "./API/auth/login.mjs";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";

function formHandler() {
  const loginForm = document.querySelector("#loginForm");
  const registerForm = document.querySelector("#registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData);
      const response = await loginUser(loginURL, data);
      console.log(response, data);
      window.location.href = "/src/HTML/auction/index.html";
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData);
      const response = await loginUser(registerURL, data);
      console.log(response);
    });
  }
}

formHandler();
