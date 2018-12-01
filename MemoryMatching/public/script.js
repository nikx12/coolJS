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

  resetBtn.addEventListener("click", () => {
    startBtn.removeAttribute("disabled", "");
    tilesInput.removeAttribute("disabled", "");
    playArea.innerHTML = "";
  });

  startBtn.addEventListener("click", () => {
    startBtn.setAttribute("disabled", "");
    tilesInput.setAttribute("disabled", "");
  });

  // Create tiles
  for (let i = 0; i < tilesInput.value; i++) {
    playArea.innerHTML += '<div class="tile"><p></p></div>';
  }

  // Push to `numsToAssign` all the numbers from 0 to `tilesInput / 2`
  var numsToAssign = [];

  for (let i = 0; i < tilesInput.value / 2; i++) {
      numsToAssign.push(i, i);
  }

  // Assign each number of `numsToAssign` to each tile randomly
  var randomNum = Math.floor(Math.random() * tilesInput.value);
  var randomTile = document.querySelectorAll('.tile p')[randomNum];

  for (let i = 0; i < tilesInput.value; i++) {
    do {
        if (!randomTile.innerHTML) {
            randomTile.innerHTML = numsToAssign.shift();
        }

        randomNum = Math.floor(Math.random() * tilesInput.value);
        randomTile = document.querySelectorAll('.tile p')[randomNum];
    } while (randomTile.innerHTML && numsToAssign.length > 0)
}
};
