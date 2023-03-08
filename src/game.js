class Game {
  constructor(firstPlayer, secondPlayer) {
    this.firstPlayer = firstPlayer; 
    this.secondPlayer = secondPlayer;
    this.currentPlayer = firstPlayer;
    this.oPlayer = {};
    this.xPlayer = {};
    this.turn = 1;
    this.isOver = false;
    this.isDraw = false;
    this.winner = null
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
    if (numOfPlayers === "2") {
      currentGame = new Game(this.secondPlayer, this.firstPlayer);
    } else if (numOfPlayers === "1") {
      currentGame = new OnePlayerGame(this.secondPlayer, this.firstPlayer);
    }
  };

  passTurn() {
    this.turn += 1;
    if (this.turn % 2 === 0) {
      this.currentPlayer = this.secondPlayer;
    } else {
      this.currentPlayer = this.firstPlayer;
    };
  };

  addChoice(choosenSquareId) {
    var playerLetter = this.currentPlayer.letter;
    for (var i = 0; i < choosenSquareId.length; i++) {
      this.choosenSquares[choosenSquareId.charAt(i)][playerLetter].push(playerLetter);
    };
  };

  checkWinOrDraw() {
    var winConArray = ""
    for (var i = 65; i < 73; i++) {
      winConArray = this.choosenSquares[String.fromCharCode(i)][this.currentPlayer.letter];
      if (winConArray.length === 3) {
        this.isOver = true;
        this.winner = this.currentPlayer;
        this.increaseWins();
        return
      } 
    };
    this.checkForDraw();
  };
  
  checkForDraw() {
    if (this.availableSquares.length === 0) {
      this.isOver = true;
      this.isDraw = true;
    };
  };

  updateAvailableSquaresArray(choosenSquareId) {
    for (var i = 0; i < this.availableSquares.length; i++) {
      if (choosenSquareId === this.availableSquares[i]) {
        this.availableSquares.splice(i,1);
      };
    };
  };

  checkXandOPlayers() {
    if (this.firstPlayer.letter === "X") {
      this.xPlayer = this.firstPlayer;
      this.oPlayer = this.secondPlayer;
    } else {
      this.xPlayer = this.secondPlayer;
      this.oPlayer = this.firstPlayer;
    };
  };

  establishXandOPlayers() {
    this.xPlayer = this.firstPlayer;
    this.oPlayer = this.secondPlayer;
    this.firstPlayer.letter = "X";
    this.secondPlayer.letter = "O";
    this.firstPlayer.token = "./assets/X_icon.jpg";
    this.secondPlayer.token = "./assets/O_icon.jpg";
  };

  updatePlayersInStorage() {
    if (this.winner) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key([i]) === this.winner.name) {
          localStorage.setItem(`${this.winner.name}`, JSON.stringify(this.winner));
        };
      };
    };
  };

  increaseWins() {
    this.currentPlayer.wins += 1;
  }

};
