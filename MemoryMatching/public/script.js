window.onload = function() {
  // Fade in the body
  document.querySelector("body").style.opacity = 0;

  setTimeout(() => {
    document.querySelector("body").style.opacity = 1;
  });

  const body = document.querySelector("body"),
    cardsNumber = document.querySelector("#settings p span"),
    cardsInput = document.querySelector("#settings input"),
    startBtn = document.querySelector("#settings button[name=start]"),
    resetBtn = document.querySelector("#settings button[name=reset]"),
    boardArea = document.querySelector("#board-area");

    console.log(startBtn, resetBtn)

  cardsInput.addEventListener("input", () => {
    cardsNumber.innerHTML = cardsInput.value;
  });

  resetBtn.addEventListener("click", () => {
    startBtn.removeAttribute("disabled", "");
    cardsInput.removeAttribute("disabled", "");
    boardArea.innerHTML = "";
  });

  startBtn.addEventListener("click", () => {
    startBtn.setAttribute("disabled", "");
    cardsInput.setAttribute("disabled", "");
 

  // Create cards
  for (let i = 0; i < cardsInput.value; i++) {
    boardArea.innerHTML += '<div class="card"><p></p></div>';
  }

  // Push to `numsToAssign` all the numbers from 0 to `cardsInput / 2`
  var numsToAssign = [];

  for (let i = 0; i < cardsInput.value / 2; i++) {
    numsToAssign.push(i, i);
  }

  // Assign each number of `numsToAssign` to each tile randomly
  var randomNum = Math.floor(Math.random() * cardsInput.value);
  var randomCard = document.querySelectorAll(".card p")[randomNum];

  for (let i = 0; i < cardsInput.value; i++) {
    do {
      if (!randomCard.innerHTML) {
        randomCard.innerHTML = numsToAssign.shift();
      }

      randomNum = Math.floor(Math.random() * cardsInput.value);
      randomCard = document.querySelectorAll(".card p")[randomNum];
    } while (randomCard.innerHTML && numsToAssign.length > 0);
  }
  startGame()

  });
  function startGame() {
    let cards = document.querySelectorAll(".card");
    let firstClickedCard;
    let secondClickedCard;

    // Add click event for every tile
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", matching);
    }

    function matching(e) {
      if (!firstClickedCard) {
        firstClickedCard = e.target.parentNode;
        firstClickedCard.firstChild.style.filter = "blur(0px)";
      } else if (e.target.parentNode !== firstClickedCard) {
        secondClickedCard = e.target.parentNode;
        secondClickedCard.firstChild.style.filter = "blur(0px)";

        /*
            If the cards match:
             - add 'matched' class to the matched cards;
             - remove the click event for the matched cards;
             - remove blur for the matched cards;
            Else keep the blur.
            */

        if (
          firstClickedCard.firstChild.innerText ==
          secondClickedCard.firstChild.innerText
        ) {
          firstClickedCard.classList.add("matched");
          secondClickedCard.classList.add("matched");
        //   firstClickedCard.classList.add("flip");
        //   secondClickedCard.classList.add("flip");

          firstClickedCard.removeEventListener("click", matching);
          secondClickedCard.removeEventListener("click", matching);

          firstClickedCard.firstChild.style.filter = "blur(0px)";
          secondClickedCard.firstChild.style.filter = "blur(0px)";

          cardsClickDelayAndWinCheck();
        } else {
          setTimeout(() => {
            firstClickedCard.firstChild.style.filter = "blur(15px)";
            secondClickedCard.firstChild.style.filter = "blur(15px)";
          }, 400);

          cardsClickDelayAndWinCheck();
        }

        setTimeout(() => {
          firstClickedCard = undefined;
        }, 400);
      }
    }
    // Removes click events on cards to be able to see the second card, then adds events back.
    function cardsClickDelayAndWinCheck() {
      let notMatchedcards = 0;

      for (let i = 0; i < cards.length; i++) {
        cards[i].removeEventListener("click", matching);

        if (!cards[i].classList.contains("matched")) {
          notMatchedcards++;
        }
      }

      if (notMatchedcards === 0) {
        console.log("You won!");
        winMenu();
        return;
      }

      setTimeout(() => {
        for (let i = 0; i < cards.length; i++) {
          cards[i].addEventListener("click", matching);
        }
      }, 400);
    }

    function winMenu() {
      body.innerHTML += '<div id="winScreen"></div>';
      document.querySelector("#winScreen").innerHTML = "<p>You won!</p>";

      setTimeout(() => {
        document.querySelector("#winScreen").style.background =
          "rgba(0, 0, 0, .7)";
      }, 100);

      setTimeout(() => {
        body.removeChild(document.querySelector("#winScreen"));
      }, 2000);
    }
  }
};
