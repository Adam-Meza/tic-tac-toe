// this will be a new class of game
// it will have a preselected secodn player - an instance ofthe CompPlayer class
// which will take its turn
// after a timer
// it will disable and add its icon to a square baseed off a rnadom selection
// game will

// add Compchoice

// avilable squares might be differnt


class OnePlayerGame extends Game {
  constructor(firstPlayer, secondPlayer, currentPlayer, oPlayer, xPlayer, turn, isOver, isDraw, winner, choosenSquares, availableSquares){
    super(
      firstPlayer, 
      currentPlayer,
      oPlayer,
      xPlayer,
      turn,
      isOver,
      isDraw,
      winner,
      choosenSquares,
      availableSquares
      )
      this.secondPlayer = new Player("Player 2")
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
    super.initiateNewGame()
  }

  addChoice(choosenSquareId){
    super.addChoice(choosenSquareId)
  }

  passTurn() {
    this.currentPlayer = this.secondPlayer
    compChoice = this.getCompChoice()
    this.compTurnDM(compChoice)
    this.compTurnDOM(compChoice)
    // then it runs compTurnDM() 
    // DM willl check which squares the user has selected
    // itll then see if any of the win cons have two
    // if so it goes into tha availbale squares array
    // finds that ID
    // uses it to add its stuff to a square and remove it from the available squares
    // and compTurnDOM()
    // first disabled everything
    // DM immediately DOM after a timer 
    // then pass turn
    // figure out timing on display
    this.currentPlayer = this.firstPlayer
  }


  compTurnDOM(compChoice){
    disableBoardSqaures()
    updateTargetSquare(compChoice)
    if (this.isOver) {
      updateWinHeader();
      setTimeout(setUpNewGame, 4000);
  } else {
    currentGame.passTurn();
    updateTurnHeader();
  };
  }

  updateSquare(compChoice) {
    for (var i = 0; i < boardSquares.length; i++) {
      if (boardSquares[i].id === compChoice) {
        boardSquares[i].classList.add(currentGame.currentPlayer.letter);
        boardSquares[i].innerHTML = `<img src="${currentGame.currentPlayer.token}">`;
      }
    } 
  }

  compTurnDM(compChoice) {
    this.addChoice(compChoice)
    this.updateAvailableSquaresArray(compChoice)
    this.checkWinOrDraw()
  }

  getCompChoice () {
    var compChoice = null
    for (var i = 65; i < 73; i++) {
      winConArray = this.choosenSquares[String.fromCharCode(i)].X;
      if (winConArray === 2) {
        compChoice = this.winCons[String.fromCharCode[i]][0]
        return compChoice
      } else {}
    }
    compChoice = Math.floor(Math.random() * this.choosenSqures.length)
    return compChoice
  }

  updateWinCons(choosenSquareId){
    var winConArray = []
    for (var i = 65; i < 73; i++) {
      winConArray = this.winCons[String.fromCharCode(i)]
      for (var j= 0; i < winConArray.length; j++) {
         if (winConArray[j] === choosenSquareId) {
          winConArray.splice(j, 1)
        }
      }
    }
  };

  
  checkWinOrDraw(){
    super.checkForDraw()
  }

  updateAvailableSquaresArray(choosenSquareId){
    super.updateAvailableSquaresArray(choosenSquareId)
    this.updateWinCons(choosenSquareId)
  }

  checkXandOPlayers(){
    super.checkXandOPlayers()
  }
  establishXandOPlayers(){
    super.establishXandOPlayers()
  }

  checkForDraw(){
    super.checkForDraw()
  }

  updatePlayersInStorage(){
    super.updatePlayersInStorage()
  }




}