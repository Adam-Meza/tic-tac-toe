class OnePlayerGame extends Game {
  constructor(firstPlayer, secondPlayer, currentPlayer, oPlayer, xPlayer, turn, isOver, isDraw, winner, chosenSquares, availableSquares) {
    super(firstPlayer, secondPlayer, currentPlayer, oPlayer, xPlayer, turn, isOver, isDraw, winner, chosenSquares, availableSquares)
    this.secondPlayer = secondPlayer || new Player("Player 2");
    this.compChoice = "";
    this.gameMode = "";
    this.winCons = {
      A: ["ADG", "AE", "AFH"],
      B: ["BD", "BEGH", "BF"],
      C: ["CDH", "CE", "CFG"],
      D: ["ADG", "BD", "CDH"],
      E: ["BEGH", "AE", "CE"],
      F: ["AFH", "BF", "CFG"],
      G: ["ADG", "BEGH", "CFG"],
      H: ["BEGH", "AFH", "CDH"],
    };
  };

  passTurn() {
    super.passTurn();
    this.checkIfCompTurn();
  };

  checkIfCompTurn() {
    if (this.currentPlayer.name === "Player 2") {
      disableSqaures();
      updateHeader();
      this.runCompTurn();
    };
  };

  runCompTurn() {
    this.setCompChoice();
    this.compTurnDM();
    this.compTurnDOM();
  };

  compTurnDM() {
    this.addChoice(this.compChoice);
    this.updateAvailableSquaresArray(this.compChoice);
    this.checkWinOrDraw();
  };

  compTurnDOM() {
    this.updateSquare();
    if (!this.isOver) {
      this.passTurn();
      this.reactiveSquares();
    } else {
      updateDOM();
    }
  };

  updateSquare() {
    boardSquares.forEach((square) => {
      if (square.id === this.compChoice) {
        square.classList.add(currentGame.currentPlayer.letter);
        square.innerHTML = `<img src="${currentGame.currentPlayer.token}">`;
      };
    });
  };

  removeSquareFromWinCons(chosenSquareId) {
    let winConArray = "";
    for (var i = 0; i < chosenSquareId.length; i++) {
      winConArray = this.winCons[chosenSquareId.charAt(i)];
      winConArray.splice((winConArray.findIndex(item => item === chosenSquareId)), 1);
    };
  };

  setCompChoiceHardMode() {
    let canCompWin = this.canAPlayerWin("O");
    let canUserWin = this.canAPlayerWin("X");

    this.turn === 1 ? this.pickARandomCorner() 
      : canCompWin ? this.attackOrBlock("O")
      : canUserWin ? this.attackOrBlock("X")
      : this.compChoice = this.availableSquares[this.getRandomIndex(this.availableSquares)]
  };

  pickARandomCorner() {
    let cornerSquares = ["ADG", "CDH", "CFG", "AFH"];
    this.compChoice = cornerSquares[this.getRandomIndex(cornerSquares)];
  };

  attackOrBlock(playerLetter) {
    let winningKey = (Object.keys(this.winCons)
    .filter(key => this.winCons[key].length === 1 && this.chosenSquares[key][playerLetter].length === 2))[0]
    this.compChoice = this.winCons[winningKey][0];
  };

  canAPlayerWin(playerLetter) {
   return (Object.keys(this.winCons)
    .some(key => this.winCons[key].length === 1 && this.chosenSquares[key][playerLetter].length === 2))
  };

  setCompChoice() {
    this.gameMode === "hard" ? this.setCompChoiceHardMode() :
      this.compChoice = this.availableSquares[this.getRandomIndex(this.availableSquares)];
  };

  reactiveSquares() {
    this.availableSquares.forEach((availSquare) => {
      boardSquares.forEach(boardSquare => availSquare === boardSquare.id ? 
        boardSquare.disabled = false : null
      )
    });
  };
  
  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  };

  initiateNewGame() {
    super.initiateNewGame();
  };

  addChoice(chosenSquareId) {
    super.addChoice(chosenSquareId);
    this.removeSquareFromWinCons(chosenSquareId);
  };

  checkWinOrDraw() {
    super.checkWinOrDraw();
  };

  updateAvailableSquaresArray(chosenSquareId) {
    super.updateAvailableSquaresArray(chosenSquareId);
  };

  checkXandOPlayers() {
    super.checkXandOPlayers();
  };

  establishXandOPlayers() {
    super.establishXandOPlayers();
  };

  checkForDraw() {
    super.checkForDraw();
  };

  updatePlayersInStorage() {
    super.updatePlayersInStorage();
  };

};