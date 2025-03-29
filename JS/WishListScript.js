let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [
    { id: 1, name: "Luxury Sofa", price: 1200, image: "sofa.jpg" },
    { id: 2, name: "Modern Chair", price: 450, image: "chair.jpg" }
];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderWishlist() {
    const wishlistContainer = document.getElementById("wishlist-items");
    wishlistContainer.innerHTML = "";
    wishlist.forEach((item, index) => {
        wishlistContainer.innerHTML += `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <button class="add-to-cart" onclick="addToCart(${index})">Add to Cart</button>
                <button class="remove-btn" onclick="removeFromWishlist(${index})">X</button>
            </div>`;
    });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function addToCart(index) {
    cart.push(wishlist[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    removeFromWishlist(index);
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    renderWishlist();
}

function moveAllToCart() {
    cart = cart.concat(wishlist);
    wishlist = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist();
}

document.addEventListener("DOMContentLoaded", renderWishlist);