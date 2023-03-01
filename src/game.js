class Game {
  constructor(firstPlayer, secondPlayer) {
    this.firstPlayer = firstPlayer 
    this.secondPlayer = secondPlayer
    this.turn = 1
    this.currentPlayer = firstPlayer
    this.availableSquares = ["ADG", "BD", "CDH", "AE", "BEGH", "CE", "AFH", "BF", "CFG",]
    this.choosenSquares = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
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

  addChoice(currentPlayer) {
    var playerLetter = currentPlayer.letter
    for (var i = 0; i < event.target.id.length; i++) {
      this.choosenSquares[event.target.id.charAt(i)].push(playerLetter)
    }
  }

  checkWinConditions(currentPlayerInst) {
    // instead of adding the square to the iwn condition add the oplayer's identifier
// ,aybe use a case here to check ["X", etc ] or [O"]
// this is gonna trigger on click after the square has been assigned
// this is gonna look at every array for each player and determine if there was a win
// then; it'll look if there are still squares left if not it declares a draw
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
