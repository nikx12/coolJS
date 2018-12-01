window.onload = function() {
  // Fade in the body
  document.querySelector("body").style.opacity = 0;

  setTimeout(() => {
    document.querySelector("body").style.opacity = 1;
  });

  const body = document.querySelector("body"),
    tilesNumber = document.querySelector("#settings p span"),
    tilesInput = document.querySelector("#settings input"),
    startBtn = document.querySelector("#settings button[name=start]"),
    resetBtn = document.querySelector("#settings button[name=reset]"),
    playArea = document.querySelector("#play-area");

  tilesInput.addEventListener("input", () => {
    tilesNumber.innerHTML = tilesInput.value;
  });

  resetBtn.addEventListener('click', () => {
    startBtn.removeAttribute('disabled', '');
    tilesInput.removeAttribute('disabled', '');
    playArea.innerHTML = '';
});

startBtn.addEventListener('click', () => {
    startBtn.setAttribute('disabled', '');
    tilesInput.setAttribute('disabled', '');
});
};