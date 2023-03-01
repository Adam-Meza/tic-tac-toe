class Game {
  constructor(firstPlayer, secondPlayer) {
    this.firstPlayer = firstPlayer 
    this.secondPlayer = secondPlayer
    this.turn = 1
    this.currentPlayer = firstPlayer
    this.availableSquares = ["ADG", "BD", "CDH", "AE", "BEGH", "CE", "AFH", "BF", "CFG",]
    this.choosenSquares = {
        A: {X:[], O:[]},
        B: {X:[], O:[]},
        C: {X:[], O:[]},
        D: {X:[], O:[]},
        E: {X:[], O:[]},
        F: {X:[], O:[]},
        G: {X:[], O:[]},
        H: {X:[], O:[]},
      }
    }

  trackTurn() {
    this.turn += 1
    if (this.turn % 2 === 0) {
      this.currentPlayer = this.secondPlayer
    } else {
      this.currentPlayer = this.firstPlayer
    }
  };

  addChoice() {
    var playerLetter = this.currentPlayer.letter
    var squareId = event.target.id
    for (var i = 0; i < squareId.length; i++) {
      this.choosenSquares[squareId.charAt(i)][playerLetter].push(playerLetter)
    }
    currentGame.checkWinConditions()
  }

  checkWinConditions() {
    var winConArray = ""
    for (var i = 65; i < 72; i++) {
      winConArray = this.choosenSquares[String.fromCharCode(i)][this.currentPlayer.letter]
      if (winConArray.length === 3) {
        gameBoard.disabled = true
        console.log("test")
      }
    }
  };

  resetBoard() {
    currentGame = new Game(this.secondPlayer, this.firstPlayer)
    for (var i = 0; i < boardSquares.length; i++) {
      boardSquares[i].disabled = false
      // boardSquares[i].classList = "board-sqaure"
    }
// this is gonna take away each player class from each swuare
// its gonna activate all teh square buttons by iterating over the childNodes array
// it'll change the header display to reflect whose turn it is
// it'll create a new instace of game with the current players
  };

}
