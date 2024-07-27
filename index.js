document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".section_offers-swiper");

  sliders.forEach((slider, index) => {
    const swiper = slider.querySelector(".swiper");
    const slides = slider.querySelectorAll(".swiper-slide");
    const leftArrow = slider.querySelector(".left-arrow");
    const rightArrow = slider.querySelector(".right-arrow");
    const scrollbarDrag = slider.querySelector(".scrollbar-drag");

    if (
      !swiper ||
      !slides.length ||
      !leftArrow ||
      !rightArrow ||
      !scrollbarDrag
    ) {
      return;
    }

    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 20;
    const visibleSlides = Math.floor(swiper.clientWidth / slideWidth);

    function updateArrows() {
      leftArrow.classList.toggle("disabled", currentIndex === 0);
      rightArrow.classList.toggle(
        "disabled",
        currentIndex >= slides.length - visibleSlides
      );
    }

    function updateScrollbar() {
      const swiperWidth = swiper.clientWidth;
      const totalSlides = slides.length;
      const visibleSlides = Math.floor(swiperWidth / slideWidth);

      const scrollbarWidth = Math.min(
        (swiperWidth / totalSlides) * visibleSlides,
        swiperWidth - 50
      );
      scrollbarDrag.style.width = `${scrollbarWidth}px`;

      const maxOffset = swiperWidth - scrollbarWidth;
      const offset = (currentIndex / (totalSlides - visibleSlides)) * maxOffset;

      scrollbarDrag.style.transform = `translateX(${Math.min(
        offset,
        maxOffset
      )}px)`;
    }

    function scrollToSlide(index) {
      const maxIndex = slides.length - visibleSlides;
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      const offset = -currentIndex * slideWidth;
      swiper.style.transform = `translateX(${offset}px)`;
      updateScrollbar();
      updateArrows();
    }

    leftArrow.addEventListener("click", () => scrollToSlide(currentIndex - 1));
    rightArrow.addEventListener("click", () => scrollToSlide(currentIndex + 1));

    updateArrows();
    updateScrollbar();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("lang-toggle");
  const langText = document.getElementById("lang-text");
  const dropdownContent = document.getElementById("dropdown-lang");

  dropdownContent.addEventListener("click", () => {
    if (langText.textContent === "ქარ") {
      langText.textContent = "Eng";
      dropdownContent.innerHTML = '<div class="lang-item">ქარ</div>';
    } else {
      langText.textContent = "ქარ";
      dropdownContent.innerHTML = '<div class="lang-item">Eng</div>';
    }
  });

  dropdownContent.addEventListener("click", (event) => {
    langText.textContent = event.target.textContent;
    dropdownContent.innerHTML = `<div class="lang-item">${
      langText.textContent === "Eng" ? "ქარ" : "Eng"
    }</div>`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navLists = document.querySelectorAll(".nav-list");
  const backgroundDiv = document.querySelector(".background-div");

  navLists.forEach((navList) => {
    navList.addEventListener("click", () => {
      const isActive = navList.classList.contains("active");
      navLists.forEach((item) => {
        item.classList.remove("active");
        const dropdownContent = item.querySelector(".dropdown-content");
        dropdownContent.style.opacity = "0";
      });

      if (!isActive) {
        navList.classList.add("active");
        const dropdownContent = navList.querySelector(".dropdown-content");
        dropdownContent.style.display = "block";
        setTimeout(() => {
          dropdownContent.style.opacity = "1";
        }, 10);
        backgroundDiv.style.opacity = "1";
      } else {
        backgroundDiv.style.opacity = "0";
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav")) {
      navLists.forEach((item) => {
        item.classList.remove("active");
        const dropdownContent = item.querySelector(".dropdown-content");
        dropdownContent.style.opacity = "0";
        setTimeout(() => {
          dropdownContent.style.display = "none";
        }, 600);
      });
      backgroundDiv.style.opacity = "0";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const colTitles = document.querySelectorAll(".footer-table .col-title");

  colTitles.forEach((colTitle) => {
    colTitle.addEventListener("click", () => {
      if (!colTitle.closest(".contact")) {
        const colList = colTitle.nextElementSibling;

        colList.classList.toggle("open");

        colTitles.forEach((title) => {
          if (title !== colTitle && !title.closest(".contact")) {
            title.nextElementSibling.classList.remove("open");
          }
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileDropdownToggles = document.querySelectorAll(
    ".mobile-dropdown-toggle"
  );

  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });

  mobileDropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      mobileDropdownToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          otherToggle.nextElementSibling.classList.remove("active");
          otherToggle
            .querySelector(".dropdown-arrow")
            .classList.remove("rotate");
        }
      });

      const dropdownList = toggle.nextElementSibling;
      const dropdownArrow = toggle.querySelector(".dropdown-arrow");

      dropdownList.classList.toggle("active");
      dropdownArrow.classList.toggle("rotate");
    });
  });
});
