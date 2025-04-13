const ordersContainer = document.getElementById("ordersContainer");
const alertBox = document.getElementById("alertBox");

function showAlert(message) {
  alertBox.textContent = message;
  alertBox.classList.remove("d-none");
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
    alertBox.classList.add("d-none");
  }, 3000);
}

function renderOrders() {
  let cartData = JSON.parse(localStorage.getItem("cart")) || [];
  ordersContainer.innerHTML = "";

  if (cartData.length === 0) {
    ordersContainer.innerHTML = `<div class="col-12"><p class="text-muted">No purchased orders found in localStorage.</p></div>`;
    return;
  }

  cartData.forEach((item, index) => {
    const isReturned = item.returned === true;
    const opacityClass = isReturned ? "opacity-50" : "";
    const statusText = isReturned ? "Returned" : "Pending";
    const disabledBtn = isReturned ? "disabled" : "";

    const orderHTML = `
      <div class="col-md-4">
        <div class="card shadow-sm h-100 ${opacityClass}">
          <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text mb-1"><strong>Order No.:</strong> #0000069</p>
            <p class="card-text mb-1"><strong>Payment Type:</strong> PayPal account - Abdallah Mokarb</p>
            <p class="card-text mb-1"><strong>Amount Paid:</strong> $${item.price}</p>
            <p class="card-text mb-1"><strong>Quantity:</strong> ${item.quantity}</p>
            <p class="card-text mb-1"><strong>Status:</strong> ${statusText}</p>
            <p class="card-text mb-3"><strong>Warehouse:</strong> Cairo</p>
            <button class="btn btn-danger mt-auto" ${disabledBtn} onclick="returnOrder(${index})">Return</button>
          </div>
        </div>
      </div>
    `;
    ordersContainer.innerHTML += orderHTML;
  });
}

function returnOrder(index) {
  let cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cartData[index];

  const confirmReturn = confirm(
    `Are you sure you want to return "${item.name}"?`
  );

  if (confirmReturn) {
    item.returned = true;
    localStorage.setItem("cart", JSON.stringify(cartData));
    showAlert(` "${item.name}" has been returned to our warehouse.`);
    renderOrders();
  } else {
    showAlert(` "${item.name}" was not returned.`);
  }
}

renderOrders();

function logout() {
  localStorage.removeItem("userCredentials");

  alert("You have been logged out.");

  window.location.href = "/";
}
