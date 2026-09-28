document.addEventListener("DOMContentLoaded", function () {
  const region = document.querySelector(".about__videos");
  if (!region || typeof Swiper === "undefined") return;

  const caption = region.querySelector(".about__video-caption");
  const toggle = region.querySelector(".about__video-toggle");
  const videos = region.querySelectorAll("video");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let shouldPlay = !reducedMotion.matches;
  let activeVideo;

  function updateButton() {
    toggle.textContent = activeVideo && !activeVideo.paused ? "Pause video" : "Play video";
  }

  function playVideo() {
    const video = activeVideo;
    if (!video || !shouldPlay || document.hidden) return;
    video.play().catch(function (error) {
      // Switching slides can interrupt an earlier play request.
      if (error.name === "AbortError") return;
      // Keep the preview and offer manual playback when autoplay is blocked.
      if (video === activeVideo && video.paused) {
        shouldPlay = false;
        updateButton();
      }
    });
  }

  function activateSlide(swiper) {
    const slide = swiper.slides[swiper.activeIndex];
    activeVideo = slide.querySelector("video");
    caption.textContent = slide.dataset.caption;
    videos.forEach(function (video) {
      if (video !== activeVideo) {
        video.pause();
        // Leave playback positions intact; seeking hidden videos can stall WebKit.
      }
    });
    updateButton();
    playVideo();
  }

  videos.forEach(function (video) {
    video.controls = false;
    video.addEventListener("play", updateButton);
    video.addEventListener("pause", updateButton);
  });
  region.querySelector(".about__video-controls").hidden = false;
  region.querySelector(".about__video-pagination").hidden = false;

  const swiper = new Swiper(region.querySelector(".aboutSwiper"), {
    loop: true,
    autoplay: false,
    speed: reducedMotion.matches ? 0 : 400,
    pagination: {
      el: region.querySelector(".about__video-pagination"),
      clickable: true,
      renderBullet: function (index, className) {
        return '<button type="button" class="' + className + '" aria-label="Go to video ' + (index + 1) + '"></button>';
      }
    },
    navigation: {
      nextEl: region.querySelector(".about__video-next"),
      prevEl: region.querySelector(".about__video-prev")
    },
    a11y: { prevSlideMessage: "Previous video", nextSlideMessage: "Next video", paginationBulletMessage: "Go to video {{index}}" },
    on: { init: activateSlide, slideChange: activateSlide }
  });

  toggle.addEventListener("click", function () {
    shouldPlay = activeVideo.paused;
    if (shouldPlay) playVideo();
    else activeVideo.pause();
  });
  videos.forEach(function (video) {
    video.addEventListener("ended", function () {
      if (video === activeVideo && shouldPlay) swiper.slideNext();
    });
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) activeVideo.pause();
    else playVideo();
  });
  reducedMotion.addEventListener("change", function (event) {
    swiper.params.speed = event.matches ? 0 : 400;
    if (event.matches) {
      shouldPlay = false;
      activeVideo.pause();
    }
  });
});
