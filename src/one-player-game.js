class OnePlayerGame extends Game {
  constructor(firstPlayer, secondPlayer, currentPlayer, oPlayer, xPlayer, turn, isOver, isDraw, winner, choosenSquares, availableSquares){
    super(firstPlayer, secondPlayer, currentPlayer, oPlayer, xPlayer, turn, isOver, isDraw, winner, choosenSquares, availableSquares)
      this.secondPlayer = secondPlayer || new Player("Player 2")
      this.winCons = {
        A:["ADG", "AE", "AFH"],
        B:["BD", "BEGH", "BF"],
        C:["CDH", "CE", "CFG"],
        D:["ADG", "BD", "CDH"],
        E:["AE", "BEGH", "AFH"],
        F:["AFH", "BF", "CFG"],
        G:["ADG", "BEGH", "CFG"],
        H:["CDH", "BEGH", "BF"]
      }
    }

  initiateNewGame(){
    super.initiateNewGame();
  }

  addChoice(choosenSquareId) {
    super.addChoice(choosenSquareId);
  }

  passTurn() {
    super.passTurn()
    this.checkIfCompTurn()
  };

  checkIfCompTurn(){
    // this.test()
    if (this.currentPlayer.name === "Player 2") {
      var compChoice = this.getCompChoice();
      this.runCompTurn(compChoice)
      this.currentPlayer = this.xPlayer;
    }
  }

  compTurnDM(compChoice) {
    this.addChoice(compChoice);
    this.updateAvailableSquaresArray(compChoice);
    this.updateWinCons(compChoice);
    this.checkWinOrDraw();
  }

  compTurnDOM(compChoice){
    disableBoardSqaures();
    updateTurnHeader();
    this.updateSquare(compChoice);
    updateDOM()
    this.reactiveSquares()
    
  };

  runCompTurn(compChoice){
    this.compTurnDM(compChoice);
    this.compTurnDOM(compChoice);
  };

  updateSquare(compChoice) {
    for (var i = 0; i < boardSquares.length; i++) {
      if (boardSquares[i].id === compChoice) {
        boardSquares[i].classList.add(currentGame.currentPlayer.letter);
        boardSquares[i].innerHTML = `<img src="${currentGame.currentPlayer.token}">`;
      };
    };
  };

  getCompChoice() {
    var compChoice = null;
    // // for (var i = 65; i < 73; i++) {
    // //   var winConArray = this.choosenSquares[String.fromCharCode(i)].X;
    // //   if (winConArray.length === 2) {
    // //     compChoice = this.winCons[String.fromCharCode(i)][0];
    // //     return compChoice;
    // //   } 
    // // }
    var randomIndex = Math.floor(Math.random() * this.availableSquares.length);
    compChoice = this.availableSquares[randomIndex]
    return compChoice;
  };

  updateWinCons(choosenSquareId){
    var winConArray = [];
    for (var i = 65; i < 73; i++) {
      winConArray = this.winCons[String.fromCharCode(i)]
      for (var j= 0; j < winConArray.length; j++) {
          if (winConArray[j] === choosenSquareId) {
          winConArray.splice(j, 1);
        };
      };
    };
  };

  reactiveSquares(){
    var squareElem = ""
    for (var i = 0; i < this.availableSquares.length; i++) {
      squareElem = this.availableSquares[i]
      for (var j = 0; j < boardSquares.length; j++) {
        if (squareElem === boardSquares[j].id) {
          boardSquares[j].disabled = false
        };
      };
    };
  };

  checkWinOrDraw() {
    super.checkWinOrDraw();
  }

  updateAvailableSquaresArray(choosenSquareId){
    super.updateAvailableSquaresArray(choosenSquareId);
  }

  checkXandOPlayers(){
    super.checkXandOPlayers();
  }
  establishXandOPlayers(){
    super.establishXandOPlayers();
  }

  checkForDraw(){
    super.checkForDraw();
  }

  updatePlayersInStorage(){
    super.updatePlayersInStorage();
  }

}