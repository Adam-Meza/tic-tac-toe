class OnePlayerGame extends Game {
  constructor(firstPlayer, secondPlayer, currentPlayer, oPlayer, xPlayer, turn, isOver, isDraw, winner, choosenSquares, availableSquares){
    super(firstPlayer, secondPlayer, currentPlayer, oPlayer, xPlayer, turn, isOver, isDraw, winner, choosenSquares, availableSquares)
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
      updateTurnHeader();
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
    updateDOM();
    if (!this.isOver) {
      this.currentPlayer = this.xPlayer;
      this.reactiveSquares();
    } else {
      updateWinHeader();
    };
  };
        
  updateSquare() {
    for (var i = 0; i < boardSquares.length; i++) {
      if (boardSquares[i].id === this.compChoice) {
        boardSquares[i].classList.add(currentGame.currentPlayer.letter);
        boardSquares[i].innerHTML = `<img src="${currentGame.currentPlayer.token}">`;
      };
    };
  };
    
  setCompChoice() {
    var randomIndex = Math.floor(Math.random() * this.availableSquares.length);
    this.compChoice = this.availableSquares[randomIndex];
  };
    
  reactiveSquares() {
    var squareElem = ""
    for (var i = 0; i < this.availableSquares.length; i++) {
      squareElem = this.availableSquares[i]
      for (var j = 0; j < boardSquares.length; j++) {
        if (squareElem === boardSquares[j].id) {
          boardSquares[j].disabled = false;
        };
      };
    };
  };
  
  initiateNewGame() {
    super.initiateNewGame();
  };

  addChoice(choosenSquareId) {
    super.addChoice(choosenSquareId);
  };

  checkWinOrDraw() {
    super.checkWinOrDraw();
  };
  
  updateAvailableSquaresArray(choosenSquareId){
    super.updateAvailableSquaresArray(choosenSquareId);
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