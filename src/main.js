// GLOBAL DATA MODEL //
var games = [];
var firstPlayer = null;
var secondPlayer = null;

// QUERY SELECTORS //
var turnHeader = document.querySelector('.js-turn-header');
var gameBoard = document.querySelector('.js-game-board');
var boardSquares = document.querySelectorAll('.js-board-square');
var playerBoxes = document.querySelectorAll('.js-player-box')
var winBoxHeaders = document.querySelectorAll('.js-win-box');
var winCounts = document.querySelectorAll('.js-win-count');
var newGameBtn = document.querySelector('.js-new-game-button');
var playBtns = document.querySelectorAll('.js-play-btn')
var playerNameTitles = document.querySelectorAll('.js-player-name')
var nameInputs = document.querySelectorAll('.js-name-input')
var nameForm = document.querySelector('.js-name-form')
var secondNameForm = document.querySelector('.js-second-name-form')

// EVENT LISTENERS // 
// window.addEventListener('load', setUpFirstGame);

for (var i = 0; i < boardSquares.length; i++) {
  boardSquares[i].addEventListener('click', function() {
    updateDM();
    updateDOM();
    currentGame.trackTurn();
  }
)}

newGameBtn.addEventListener('click', function() {
  updateDMForNewGame();
  updateDOMForNewGame();
})

for (var i = 0; i <playBtns.length; i++) {
  playBtns[i].addEventListener('click', function(event){
    event.preventDefault()
    storeNameInput()
    pageNagivation()
  }
)}

for (var i = 0; i < nameInputs.length; i++){
  nameInputs[i].addEventListener('click', function(){
  })
}

// DOM MANIPULATION - BUNDLE FUNCTIONS //

function pageNagivation(){
  if (!secondPlayer) {
    hide(nameForm)
    show(secondNameForm)
  } else if (firstPlayer && secondPlayer) {
    setUpFirstGame()
  }
}

function setUpFirstGame(){
  updateDMforFirstGame()
  updateDOMforFirstGame()
}

function updateDM() {
  currentGame.addChoice();
  currentGame.checkWinConditions();
  currentGame.updateAvailableSquaresArray();
}

function updateDOM() {
  updateTargetSquare();
  disableBoardSqaures();
  updateTurnHeader();
}

function updateDMForNewGame() {
  currentGame.initiateNewGame();
  currentGame.establishXandOPlayers();
}

function updateDOMForNewGame() {
  activateSquares();
  resetDOM();
  updateTurnHeader();
  updateWinCounter();
}

// DOM MANIPULATION - ATOMIC FUNCTIONS //

function storeNameInput(){
  if (nameInputs[0].value && !firstPlayer){
    firstPlayer = new Player(`${nameInputs[0].value}`, "X", "./assets/X_icon.jpg")
  } else if (nameInputs[1].value && !secondPlayer) {
    secondPlayer = new Player(`${nameInputs[1].value}`, "O","./assets/O_icon.jpg" )
  } else if (!nameInputs[0].value && !firstPlayer){
    firstPlayer = new Player("Player 1", "X", "./assets/X_icon.jpg")
  } else if (!nameInputs[1].value && !secondPlayer) {
    secondPlayer = new Player("Player 2", "O", "./assets/O_icon.jpg")
  }
  clearInput()
}

function clearInput(){
  nameInputs[0].value = ""
  nameInputs[1].value = ""
}

function hide(element){
  element.classList.add('hidden')
}

function show(element){
  element.classList.remove('hidden')
}

function updateDMforFirstGame(){
  currentGame = new Game (firstPlayer, secondPlayer)
  currentGame.establishXandOPlayers();
}

function updateDOMforFirstGame(){
  hide(secondNameForm)
  show(gameBoard)
  show(playerBoxes[0])
  show(playerBoxes[1])
  show(newGameBtn)
  playerNameTitles[0].innerText = currentGame.firstPlayer.name
  playerNameTitles[1].innerText = currentGame.secondPlayer.name
  updateTurnHeader();
}

function updateTargetSquare() {
  event.target.disabled = true;
  event.target.classList.add(currentGame.currentPlayer.letter);
  event.target.innerHTML = `<img src="${currentGame.currentPlayer.token}">`;
};

function disableBoardSqaures() {
  if (currentGame.isOver) {
    for (var i = 0; i < boardSquares.length; i++) {
      boardSquares[i].disabled = true;
    };
  };
};

function updateTurnHeader() {
  if (currentGame.isOver) {
    turnHeader.innerHTML = `${currentGame.currentPlayer.name} wins!`;
  } else {
    turnHeader.innerHTML = `It's ${currentGame.currentPlayer.name}'s Turn!`;
  };
};

function activateSquares () {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = false;
  };
};

function resetDOM() {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = false;
    boardSquares[i].classList.remove("X");
    boardSquares[i].classList.remove("O");
    boardSquares[i].innerHTML = ""
  };
};

function updateWinCounter() {
    winCounts[0].innerHTML = currentGame.xPlayer.wins;
    winCounts[1].innerHTML = currentGame.oPlayer.wins;
};