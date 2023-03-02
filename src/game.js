class Game {
  constructor(firstPlayer, secondPlayer) {
    this.firstPlayer = firstPlayer; 
    this.secondPlayer = secondPlayer;
    this.currentPlayer = firstPlayer;
    this.oPlayer = {};
    this.xPlayer = {};
    this.turn = 1;
    this.isOver = false;
    this.availableSquares = ["ADG", "BD", "CDH", "AE", "BEGH", "CE", "AFH", "BF", "CFG",];
    this.choosenSquares = {
        A: {X:[], O:[]},
        B: {X:[], O:[]},
        C: {X:[], O:[]},
        D: {X:[], O:[]},
        E: {X:[], O:[]},
        F: {X:[], O:[]},
        G: {X:[], O:[]},
        H: {X:[], O:[]},
      };
    };

  initiateNewGame() {
    currentGame = new Game(this.secondPlayer, this.firstPlayer);
  };

  trackTurn() {
    this.turn += 1;
    if (this.turn % 2 === 0) {
      this.currentPlayer = this.secondPlayer;
    } else {
      this.currentPlayer = this.firstPlayer;
    };
  };

  addChoice() {
    var playerLetter = this.currentPlayer.letter;
    var squareId = event.target.id;
    for (var i = 0; i < squareId.length; i++) {
      this.choosenSquares[squareId.charAt(i)][playerLetter].push(playerLetter);
    };
  };

  checkWinConditions() {
    var winConArray = "";
    for (var i = 65; i < 73; i++) {
      winConArray = this.choosenSquares[String.fromCharCode(i)][this.currentPlayer.letter]
      if (winConArray.length === 3) {
        this.isOver = true;
        this.currentPlayer.increaseWins();
      };
    };
  };

  updateAvailableSquaresArray() {
    for (var i = 0; i < this.availableSquares.length; i++) {
      if (event.target.id === this.availableSquares[i]) {
        this.availableSquares.splice(i,1);
      };
    };
  };

  establishXandOPlayers() {
    if (this.firstPlayer.letter === "X") {
      this.xPlayer = this.firstPlayer;
      this.oPlayer = this.secondPlayer;
    } else {
      this.xPlayer = this.secondPlayer;
      this.oPlayer = this.firstPlayer;
    };
  };
  
}
