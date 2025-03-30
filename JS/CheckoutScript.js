document.addEventListener("DOMContentLoaded", function () {
  const placeOrderBtn = document.getElementById("placeOrder");
  const countryInput = document.getElementById("countryInput");
  const cityInput = document.getElementById("cityInput");
  const addressInput = document.getElementById("adressInput");
  const detailsInput = document.getElementById("detailsInput");
  const successMessage = document.getElementById("successMessage");
  const mainSection = document.getElementById("mainSection");
  const userEmailSpan = document.getElementById("userEmail");
  const btnText = document.getElementById("btnText");
  const loadingSpinner = document.getElementById("loadingSpinner");

  function validateForm() {
    let isValid = true;

    if (countryInput.value.trim().length < 3) {
      document.getElementById("countryError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("countryError").style.display = "none";
    }

    if (cityInput.value.trim().length < 3) {
      document.getElementById("cityError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("cityError").style.display = "none";
    }

    if (addressInput.value.trim().length < 5) {
      document.getElementById("adressError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("adressError").style.display = "none";
    }

    if (detailsInput.value.trim().length < 5) {
      document.getElementById("detailsError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("detailsError").style.display = "none";
    }

    placeOrderBtn.disabled = !isValid;
    placeOrderBtn.style.opacity = isValid ? "1" : "0.3";
    placeOrderBtn.style.cursor = isValid ? "pointer" : "not-allowed";
  }

  countryInput.addEventListener("input", validateForm);
  cityInput.addEventListener("input", validateForm);
  addressInput.addEventListener("input", validateForm);
  detailsInput.addEventListener("input", validateForm);

  placeOrderBtn.addEventListener("click", function () {
    if (placeOrderBtn.disabled) return;

    const selectedPayment = document
      .querySelector("input[name='payment']:checked")
      .nextElementSibling.textContent.trim();

    if (selectedPayment === "Bank") {
      window.location.href = "https://www.paypal.com/paypalme/am/10";
    } else {
      placeOrderBtn.disabled = true;
      btnText.style.display = "none";
      loadingSpinner.style.display = "inline";

      setTimeout(() => {
        userEmailSpan.textContent = document.getElementById("emailInput").value;
        mainSection.style.display = "none";
        successMessage.style.display = "block";
      }, 1500);
    }
  });
});
