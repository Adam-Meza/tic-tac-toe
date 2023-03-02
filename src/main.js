// GLOBAL DATA MODEL //
var currentGame = new Game(new Player("Player 1", "X", "./assets/X_icon.jpg"), new Player("Player 2", "O", "./assets/O_icon.jpg"))
var games = []

// QUERY SELECTORS //
var turnHeader = document.querySelector('.js-turn-header')
var gameBoard = document.querySelector('.js-game-board')
var boardSquares = document.querySelectorAll('.js-board-square')
var winBoxHeader = document.querySelectorAll('.js-win-box')
var winCount = document.querySelectorAll('.js-win-count')
var newGameBtn = document.querySelector('.js-new-game-button')

// EVENT LISTENERS // 
window.addEventListener('load', setUpFirstGame)

for (var i = 0; i < boardSquares.length; i++) {
  boardSquares[i].addEventListener('click', function(event) {
    updateDM()
    updateDOM()
    currentGame.trackTurn();
  }
)}

newGameBtn.addEventListener('click', function() {
  updateDMForNewGame()
  updateDOMForNewGame()
})

// DOM MANIPULATION - BUNDLE FUNCTIONS //

function setUpFirstGame() {
  currentGame.establishXandOPlayers();
  updateTurnHeader();
}

function updateDM() {
  currentGame.addChoice();
  currentGame.checkWinConditions();
  currentGame.updateAvailableSquaresArray();
}

function updateDOM() {
  updateTargetSquare();
  disableBoardSqaures();
  updateTurnHeader();
}

function updateDMForNewGame() {
  currentGame.initiateNewGame();
  currentGame.establishXandOPlayers();
}

function updateDOMForNewGame() {
  activateSquares();
  resetDOM();
  updateTurnHeader();
  updateWinCounter();
}

// DOM MANIPULATION - ATOMIC FUNCTIONS // 

function updateTargetSquare() {
  event.target.disabled = true;
  event.target.classList.add(currentGame.currentPlayer.letter);
  console.log(currentGame)
  console.log(currentGame.currentPlayer)
  console.log(currentGame.currentPlayer.token)
  event.target.setAttribute("src", currentGame.currentPlayer.token);
};

function disableBoardSqaures() {
  if (currentGame.isOver) {
    for (var i = 0; i < boardSquares.length; i++) {
      boardSquares[i].disabled = true;
    };
  };
};

function updateTurnHeader() {
  if (currentGame.isOver) {
    turnHeader.innerHTML = `${currentGame.currentPlayer.name} wins!`;
  } else {
    turnHeader.innerHTML = `It's ${currentGame.currentPlayer.name}'s Turn!`;
  };
};

function activateSquares () {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = false;
  };
};

function resetDOM() {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = false;
    boardSquares[i].classList.remove("X");
    boardSquares[i].classList.remove("O");
  };
};

function updateWinCounter() {
    winCount[0].innerHTML = currentGame.xPlayer.wins;
    winCount[1].innerHTML = currentGame.oPlayer.wins;
};