          let cart = JSON.parse(localStorage.getItem("cart")) || [
            { id: 1, name: "Sofa", price: 650, quantity: 1, image: "furniture1.jpg" },
            { id: 2, name: "Table", price: 550, quantity: 2, image: "furniture2.jpg" },
            { id: 3, name: "Table", price: 580, quantity: 2, image: "furniture2.jpg" },
            { id: 4, name: "Table", price: 520, quantity: 4, image: "furniture2.jpg" }
        ];

        function renderCart() {
            const cartContainer = document.getElementById("cart-items");
            cartContainer.innerHTML = "";
            let total = 0;
            cart.forEach((item, index) => {
                let subtotal = item.price * item.quantity;
                total += subtotal;
                cartContainer.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <span>$${item.price}</span>
                        <input type="number" value="${item.quantity}" min="1" class="quantity" data-index="${index}">
                        <span class="subtotal">$${subtotal}</span>
                        <button class="remove-btn" onclick="removeItem(${index})">X</button>
                    </div>`;
            });
            document.getElementById("total-price").innerText = total;
            localStorage.setItem("cart", JSON.stringify(cart));
            attachEventListeners();
        }

        function removeItem(index) {
            cart.splice(index, 1);
            renderCart();
        }

        function updateQuantity(event) {
            let index = event.target.dataset.index;
            cart[index].quantity = parseInt(event.target.value);
            renderCart();
        }

        function attachEventListeners() {
            document.querySelectorAll(".quantity").forEach(input => {
                input.addEventListener("change", updateQuantity);
            });
        }

        document.addEventListener("DOMContentLoaded", renderCart);