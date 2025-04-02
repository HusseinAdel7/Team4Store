let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch furniture items from API and populate wishlist
async function fetchWishlist() {
    try {
        const response = await fetch("https://furnistyle.runasp.net/api/Furniture/CreateFurniture");
        const data = await response.json();

        if (wishlist.length === 0) {
            wishlist = data.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image || "default.jpg"
            }));
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
        renderWishlist();
    } catch (error) {
        console.error("Error fetching wishlist data:", error);
    }
}

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

// Initialize wishlist
document.addEventListener("DOMContentLoaded", fetchWishlist);
