const form = document.getElementById("loginForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const registerBtn = document.getElementById("registerBtn");
const submitBtn = document.getElementById("submitBtn");

registerBtn.addEventListener("click", () => {
  const username = document.getElementById("username");
  const avatar = document.getElementById("avatar");
  username.classList.toggle("collapse");
  avatar.classList.toggle("collapse");
  if (username.classList.contains("collapse")) {
    registerBtn.textContent = "Register";
    submitBtn.textContent = "Login";
    form.id = "loginForm";
  } else if (!username.classList.contains("collapse")) {
    registerBtn.textContent = "Return";
    submitBtn.textContent = "Submit";
    form.id = "registerForm";
  }
});
