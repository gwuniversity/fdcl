document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".news__track");
  if (!track) return;

  const section = track.closest(".section-news");
  const controls = section.querySelector(".news__controls");
  const previous = controls.querySelector(".news__previous");
  const next = controls.querySelector(".news__next");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function updateControls() {
    const end = track.scrollWidth - track.clientWidth;
    controls.hidden = end <= 1;
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= end - 1;
  }

  function scrollToItem(direction) {
    const items = track.querySelectorAll(".news__item");
    if (items.length < 2) return;
    const step = items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
    track.scrollBy({ left: direction * step, behavior: reducedMotion.matches ? "auto" : "smooth" });
  }

  previous.addEventListener("click", function () { scrollToItem(-1); });
  next.addEventListener("click", function () { scrollToItem(1); });
  track.addEventListener("scroll", updateControls, { passive: true });
  track.addEventListener("keydown", function (event) {
    if (event.target !== track) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      scrollToItem(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      track.scrollTo({ left: event.key === "Home" ? 0 : track.scrollWidth, behavior: reducedMotion.matches ? "auto" : "smooth" });
    }
  });
  new ResizeObserver(updateControls).observe(track);
  updateControls();
});
