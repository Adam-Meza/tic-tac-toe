// Data Model
var currentGame = new Game([new Player("Player 1", "X")],[new Player("Player 2", "X")])
// var currentPlayer = {}
var games = []

// query selectors
var gameBoard = document.querySelector('.game-board')
var boardSquares = document.querySelectorAll('.board-square')

var newGameBtn = document.querySelector('.js-new-game-button')


//eventListeners
// window.addEventListener('load', currentGame.resetBoard())
gameBoard.addEventListener('click', function() {
  disableSquare()
})

newGameBtn.addEventListener('click', function() {
  activateButtons()
  currentGame.resetBoard()
})



// functions 
    // pass turn, by accessing the firstPlay and secPlay and sswitching

function disableSquare() {
  event.target.disabled = true
}

function activateButtons(){

}