document.addEventListener("DOMContentLoaded", function () {
  const placeOrderBtn = document.getElementById("placeOrder");
  const countryInput = document.getElementById("countryInput");
  const cityInput = document.getElementById("cityInput");
  const addressInput = document.getElementById("adressInput");
  const detailsInput = document.getElementById("detailsInput");
  const btnText = document.getElementById("btnText");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const successMessage = document.getElementById("successMessage");
  const mainSection = document.getElementById("mainSection");

  const touched = {
    countryInput: false,
    cityInput: false,
    addressInput: false,
    detailsInput: false,
  };
  function validateForm(showErrors = true) {
    let isValid = true;
    const fields = [
      { input: countryInput, minLength: 3, errorId: "countryError" },
      { input: cityInput, minLength: 3, errorId: "cityError" },
      { input: addressInput, minLength: 5, errorId: "adressError" },
      { input: detailsInput, minLength: 5, errorId: "detailsError" },
    ];
    fields.forEach(({ input, minLength, errorId }) => {
      const value = input.value.trim();
      const errorElement = document.getElementById(errorId);
      const inputTouched = touched[input.id];
      if (value.length < minLength) {
        isValid = false;
        if (inputTouched && showErrors) {
          errorElement.style.display = "block";
        }
      } else {
        errorElement.style.display = "none";
      }
    });
    placeOrderBtn.disabled = !isValid;
    placeOrderBtn.style.opacity = isValid ? "1" : "0.3";
    placeOrderBtn.style.cursor = isValid ? "pointer" : "not-allowed";
  }

  [countryInput, cityInput, addressInput, detailsInput].forEach((input) => {
    input.addEventListener("input", () => {
      touched[input.id] = true;
      validateForm(true);
    });
    input.addEventListener("blur", () => {
      touched[input.id] = true;
      validateForm(true);
    });
  });
  function loadUserData() {
    const storedData = localStorage.getItem("userCredentials");
    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        document.getElementById("nameInput").value = userData.name || "";
        document.getElementById("emailInput").value = userData.email || "";
        document.getElementById("mobileInput").value = userData.mobile || "";
      } catch (error) {
        console.error("Error parsing userCredentials:", error);
      }
    }
  }
  function loadCart() {
    const storedCart = localStorage.getItem("cart");
    let cart = [];
    if (storedCart) {
      try {
        cart = JSON.parse(storedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
    const cartItemsContainer = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    let subtotal = 0;
    if (cart.length > 0) {
      const cartItemsHTML = cart
        .map((item) => {
          const itemTotal = item.price * item.quantity;
          subtotal += itemTotal;
          return `
                      <div class="row mb-3">
                          <div class="col-2">
                              <img src="${item.image}" alt="${
            item.name
          }" class="img-fluid" />
                          </div>
                          <div class="col-6">${item.name} (x${
            item.quantity
          })</div>
                          <div class="col-4 text-end">$${itemTotal.toFixed(
                            2
                          )}</div>
                      </div>
                  `;
        })
        .join("");
      cartItemsContainer.innerHTML = cartItemsHTML;
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      totalElement.textContent = `$${subtotal.toFixed(2)}`;
    } else {
      cartItemsContainer.innerHTML = `<p class="text-center text-muted">Your cart is empty.</p>`;
    }
  }
  placeOrderBtn.addEventListener("click", function () {
    if (!placeOrderBtn.disabled) {
      btnText.style.display = "none";
      loadingSpinner.style.display = "inline-block";
      placeOrderBtn.disabled = true;
      setTimeout(() => {
        mainSection.style.display = "none";
        successMessage.style.display = "block";
        countryInput.value = "";
        cityInput.value = "";
        addressInput.value = "";
        detailsInput.value = "";
        btnText.style.display = "inline";
        loadingSpinner.style.display = "none";
        validateForm(false);
        Object.keys(touched).forEach((key) => (touched[key] = false));
      }, 2000);
    }
  });
  loadUserData();
  loadCart();
  validateForm(false);
});
