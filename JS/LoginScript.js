const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const mainSection = document.getElementById("mainSection");
const successMessage = document.getElementById("successMessage");
const btnText = document.getElementById("btnText");
const loadingSpinner = document.getElementById("loadingSpinner");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

function validateForm() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  let isValid = true;

  if (!emailRegex.test(email) && !phoneRegex.test(email)) {
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  if (password.length < 6) {
    passwordError.style.display = "block";
    isValid = false;
  } else {
    passwordError.style.display = "none";
  }

  loginBtn.disabled = !isValid;
  loginBtn.style.opacity = isValid ? "1" : "0.3";
  loginBtn.style.cursor = isValid ? "pointer" : "not-allowed";
}

emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);

loginBtn.addEventListener("click", function () {
  loginBtn.disabled = true;
  btnText.style.display = "none";
  loadingSpinner.style.display = "inline";

  setTimeout(() => {
    const userEmailValue = emailInput.value.trim();
    userEmail.textContent = userEmailValue;
    // hide all content
    mainSection.style.display = "none";
    // show success message
    successMessage.style.display = "block";
    // simulate backend response delay
  }, 1500);
});

document.querySelectorAll("#signInBtn").forEach((button) => {
  button.addEventListener("click", function () {
    document.getElementById("message").style.display = "block";
  });
});
