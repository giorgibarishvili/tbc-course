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
