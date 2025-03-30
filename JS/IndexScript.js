const endDate = new Date("April 7, 2025 00:00:00 PDT").getTime();
const countdown = setInterval(() => {
  const now = new Date().getTime();
  const timeLeft = endDate - now;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText =
    seconds < 10 ? "0" + seconds : seconds;

  if (timeLeft < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown-box").innerHTML =
      "<h3> Opps Flash Sale Ended !</h3>";
  }
}, 1000);
// *****************************************

var owl = $(".owl-carousel");
owl.owlCarousel({
  items: 4,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 900,
  autoplayHoverPause: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 2,
      nav: true,
      loop: true,
    },
    600: {
      items: 4,
      nav: false,
      loop: true,
    },
    1000: {
      items: 7,
      nav: true,
      loop: false,
      loop: true,
    },
  },
});
$(".play").on("click", function () {
  owl.trigger("play.owl.autoplay", [1000]);
});
$(".stop").on("click", function () {
  owl.trigger("stop.owl.autoplay");
});
// ************************************

var typed = new Typed(".typing ", {
  strings: ["for fastest", "for strongest", "for newest", "for best"],
  typeSpeed: 100,
  backSpeed: 180,
  loop: true,
});

// ***********************************************
document.addEventListener("DOMContentLoaded", function () {
  // add item to cart
  // add to Wishlist event
  function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      item.quantity = 1;
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("item added to cart !");
  }

  function addToWishlist(item) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let exists = wishlist.some((i) => i.id === item.id);

    if (!exists) {
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("item added to wishlist !");
    } else {
      alert("item is already in wishlist !");
    }
  }

  document.querySelectorAll(".item").forEach((itemElement) => {
    let item = {
      id: itemElement.getAttribute("data-id"),
      name: itemElement.getAttribute("data-name"),
      price: itemElement.getAttribute("data-price"),
      image: itemElement.getAttribute("data-image"),
    };

    itemElement
      .querySelector(".btnaddtocart")
      .addEventListener("click", (e) => {
        e.preventDefault();
        addToCart(item);
      });

    itemElement
      .querySelector(".add-to-wishlist")
      .addEventListener("click", (e) => {
        e.preventDefault();
        addToWishlist(item);
      });
  });
});

// **********************************************
// update counts in main navbar
document.addEventListener("DOMContentLoaded", function () {
  function updateCounts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    document.getElementById("cartCount").textContent = cart.length;
    document.getElementById("wishlistCount").textContent = wishlist.length;
  }

  updateCounts();

  function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart.some((i) => i.name === item.name)) {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCounts();
    }
  }

  function addToWishlist(item) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.some((i) => i.name === item.name)) {
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateCounts();
    }
  }

  document.querySelectorAll(".item").forEach((itemCard) => {
    let name = itemCard.querySelector("h6").textContent;
    let price = itemCard
      .querySelector(".text-danger")
      .textContent.replace("$", "")
      .trim();
    let imageSrc = itemCard.querySelector("img").src;

    let item = { name, price, image: imageSrc };

    itemCard
      .querySelector(".btnaddtocart")
      .addEventListener("click", function (event) {
        event.preventDefault();
        addToCart(item);
      });

    itemCard
      .querySelector(".heart-icon")
      .addEventListener("click", function (event) {
        event.preventDefault();
        addToWishlist(item);
      });

    itemCard.querySelector(".eye-icon").addEventListener("click", function () {
      localStorage.setItem("selectedItem", JSON.stringify(item));
      window.location.href = "ProductDetails.html";
    });
  });
});
