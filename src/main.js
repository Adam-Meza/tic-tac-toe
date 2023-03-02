// Data Model
var currentGame = new Game(new Player("Player 1", "X"), new Player("Player 2", "O"))
var games = []

// query selectors
var gameBoard = document.querySelector('.game-board')
var boardSquares = document.querySelectorAll('.board-square')
var playerBoxHeader = document.querySelectorAll('.player-box')
var turnHeader = document.querySelector('.turn-header')
var newGameBtn = document.querySelector('.js-new-game-button')

//eventListeners
// window.addEventListener('load', currentGame.initiateNewGame())

for (var i = 0; i < boardSquares.length; i++) {
  boardSquares[i].addEventListener('click', function(event) {
    currentGame.addChoice()
    currentGame.checkWinConditions();
    currentGame.trackTurn();
    disableSquare()
    disableBoardSqaures();
  })
}

newGameBtn.addEventListener('click', function() {
  currentGame.initiateNewGame()
  resetDOM()
  activateSquares()
})

// functions 
function disableSquare() {
  event.target.disabled = true
}

function disableBoardSqaures() {
  for (var i = 0; i < boardSquares.length; i++) {
    if (currentGame.checkWinConditions()) {
      boardSquares[i].disabled = true
    } 
  }
}
    
function activateSquares () {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = false
  } 
}

function updateTurnHeader() {
  turnHeader.innerHTML = `It's ${this.currentPlayer}'s Turn!`
}

function resetDOM() {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = false;
    boardSquares[i].classList.remove("X");
    boardSquares[i].classList.remove("O");
    };

}