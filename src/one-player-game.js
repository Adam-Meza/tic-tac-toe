class OnePlayerGame extends Game {
  constructor(firstPlayer, secondPlayer, currentPlayer, oPlayer, xPlayer, turn, isOver, isDraw, winner, chosenSquares, availableSquares){
    super(firstPlayer, secondPlayer, currentPlayer, oPlayer, xPlayer, turn, isOver, isDraw, winner, chosenSquares, availableSquares)
      this.secondPlayer = secondPlayer || new Player("Player 2");
      this.compChoice = "";
    };

  passTurn() {
    super.passTurn();
    this.checkIfCompTurn();
  };
    
  checkIfCompTurn() {
    if (this.currentPlayer.name === "Player 2") {
      disableBoardSqaures();
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

  setCompChoice() {
    var randomIndex = Math.floor(Math.random() * this.availableSquares.length);
    this.compChoice = this.availableSquares[randomIndex];
  };
    
  reactiveSquares() {
    this.availableSquares.forEach((availSquare) => {
      boardSquares.forEach((boardSquare) => {        
        if (availSquare === boardSquare.id) {
        boardSquare.disabled = false;
        };
      });
    });
  };
  
  initiateNewGame() {
    super.initiateNewGame();
  };

  addChoice(chosenSquareId) {
    super.addChoice(chosenSquareId);
  };

  checkWinOrDraw() {
    super.checkWinOrDraw();
  };
  
  updateAvailableSquaresArray(chosenSquareId){
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