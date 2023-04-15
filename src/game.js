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
    this.chosenSquares = {
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
    numOfPlayers === "2" ? currentGame = new Game(this.secondPlayer, this.firstPlayer) 
      : currentGame = new OnePlayerGame(this.secondPlayer, this.firstPlayer);
  };

  passTurn() {
    this.turn += 1;
    this.turn % 2 === 0 ? this.currentPlayer = this.secondPlayer
     : this.currentPlayer = this.firstPlayer;
  };

  addChoice(chosenSquareId) {
    let playerLetter = this.currentPlayer.letter;
    for (let i = 0; i < chosenSquareId.length; i++) {
      this.chosenSquares[chosenSquareId.charAt(i)][playerLetter].push(chosenSquareId);
    };
    console.log(currentGame)
  };

  checkWinOrDraw() {
    let winConArray = ""
    for (let i = 65; i < 73; i++) {
      winConArray = this.chosenSquares[String.fromCharCode(i)][this.currentPlayer.letter];
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
      this.isOver = true
      this.isDraw = true
    };
  };

  updateAvailableSquaresArray(chosenSquareId) {
    this.availableSquares.forEach((id, i) => {
      if (chosenSquareId === id) { 
        this.availableSquares.splice(i,1);
      }
    });
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
  };

};
