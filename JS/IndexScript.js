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
