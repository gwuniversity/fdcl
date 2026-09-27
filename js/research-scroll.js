document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".research__track").forEach(function (track) {
    const section = track.closest(".section-featured-research");
    const controls = section.querySelector(".research__controls");
    const previous = controls.querySelector(".research__previous");
    const next = controls.querySelector(".research__next");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateControls() {
      const end = track.scrollWidth - track.clientWidth;
      controls.hidden = end <= 1;
      previous.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= end - 1;
    }

    function scrollColumn(direction) {
      const item = track.querySelector(".research__item");
      if (!item) return;
      const step = item.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
      track.scrollBy({ left: direction * step, behavior: reducedMotion.matches ? "auto" : "smooth" });
    }

    previous.addEventListener("click", function () { scrollColumn(-1); });
    next.addEventListener("click", function () { scrollColumn(1); });
    track.addEventListener("scroll", updateControls, { passive: true });
    track.addEventListener("keydown", function (event) {
      if (event.target !== track) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        scrollColumn(event.key === "ArrowLeft" ? -1 : 1);
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        track.scrollTo({ left: event.key === "Home" ? 0 : track.scrollWidth, behavior: reducedMotion.matches ? "auto" : "smooth" });
      }
    });
    new ResizeObserver(updateControls).observe(track);
    updateControls();
  });
});
