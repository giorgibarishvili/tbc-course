const slider = document.getElementById("offers-slider");
const track = document.getElementById("offers-track");
const btnLeft = document.getElementById("slide-left");
const btnRight = document.getElementById("slide-right");

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

btnLeft.addEventListener("click", () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  setSliderPosition();
});

btnRight.addEventListener("click", () => {
  currentIndex = Math.min(currentIndex + 1, track.children.length - 3);
  setSliderPosition();
});

slider.addEventListener("mousedown", touchStart);
slider.addEventListener("mouseup", touchEnd);
slider.addEventListener("mouseleave", touchEnd);
slider.addEventListener("mousemove", touchMove);

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchend", touchEnd);
slider.addEventListener("touchmove", touchMove);

function touchStart(event) {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < track.children.length - 3)
    currentIndex += 1;
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setSliderPosition();
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  currentTranslate = (currentIndex * -slider.offsetWidth) / 3;
  track.style.transform = `translateX(${currentTranslate}px)`;
  prevTranslate = currentTranslate;
}

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
