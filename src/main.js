// GLOBAL DATA MODEL //
var currentGame = {};
var firstPlayer = null;
var secondPlayer = null;

// QUERY SELECTORS //
var gameBoard = document.querySelector('.js-game-board');
var boardSquares = document.querySelectorAll('.js-board-square');
var playerBoxes = document.querySelectorAll('.js-player-box')
var winBoxHeaders = document.querySelectorAll('.js-win-box');
var turnHeader = document.querySelector('.js-turn-header');
var winCounts = document.querySelectorAll('.js-win-count');
var nameInput = document.querySelector('.js-name-input');
var nameForm = document.querySelector('.js-name-form');
var playerNameTitles = document.querySelectorAll('.js-player-name');
var newGameBtn = document.querySelector('.js-new-game-button');
var playBtn = document.querySelector('.js-play-btn');

// EVENT LISTENERS // 

nameInput.addEventListener('input', function(){
  updateNameFormDOM() 
  });

function updateNameFormDOM(){
  if (nameInput.value) {
    playBtn.innerText = "Let's Play!"
  } else {
    playBtn.innerText = "Continue as Guest"
  }
}
playBtn.addEventListener('click', function(event){
  event.preventDefault();
  storeNameInput();
  pageNagivation();
});

for (var i = 0; i < boardSquares.length; i++) {
  boardSquares[i].addEventListener('click', function() {
    updateDM();
    updateDOM();
  }
  )};
  
  newGameBtn.addEventListener('click', function() {
  updateDMforNewGame();
  updateDOMforNewGame();
});


function pageNagivation() {
  clearInput();
  if (!secondPlayer) {
    nameForm.classList = "second-name-form js-name-form"
    playBtn.classList = "second-play-btn js-play-btn"
  } else if (firstPlayer && secondPlayer) {
    updateDMforFirstGame();
    updateDOMforFirstGame();
  };
};


function storeNameInput() {
  if (nameInput.value && !firstPlayer) {
    firstPlayer = new Player ( `${nameInput.value}`, "X", "./assets/X_icon.jpg");
  } else if (nameInput.value && !secondPlayer) {
    secondPlayer = new Player ( `${nameInput.value}`, "O", "./assets/O_icon.jpg");
  } else if (!nameInput.value && !firstPlayer) {
    firstPlayer = new Player ("Player 1", "X", "./assets/X_icon.jpg");
  } else if (!nameInput.value && !secondPlayer) {
    secondPlayer =  new Player ("Player 2", "O", "./assets/O_icon.jpg");
  };
};

// DOM MANIPULATION - BUNDLE FUNCTIONS //


function updateDM() {
  currentGame.addChoice();
  currentGame.updateAvailableSquaresArray();
  currentGame.checkWinOrDraw();
};

function updateDOM() {
  updateTargetSquare();
  if (currentGame.isOver) { 
    disableBoardSqaures();
    updateWinHeader();
    setTimeout(setUpNewGame, 4000);
  } else {
    currentGame.trackTurn();
    updateTurnHeader();
  };
};

function setUpNewGame() {
    updateDMforNewGame();
    updateDOMforNewGame();
};

function updateDMforNewGame() {
  currentGame.initiateNewGame();
  currentGame.establishXandOPlayers();
};

function updateDOMforNewGame() {
  activateSquares();
  resetDOM();
  updateTurnHeader();
  updateWinCounter();
};

function updateDMforFirstGame() {
  currentGame = new Game(firstPlayer, secondPlayer);
  currentGame.establishXandOPlayers();
};

function updateDOMforFirstGame() {
  hide(nameForm);
  show(gameBoard);
  show(newGameBtn);
  show(playerBoxes[0]);
  show(playerBoxes[1]);
  playerNameTitles[0].innerText = currentGame.firstPlayer.name;
  playerNameTitles[1].innerText = currentGame.secondPlayer.name;
  updateTurnHeader();
};

// DOM MANIPULATION - ATOMIC FUNCTIONS //


function clearInput(){
  nameInput.value = "";
};

function updateTargetSquare() {
  event.target.disabled = true;
  event.target.classList.add(currentGame.currentPlayer.letter);
  event.target.innerHTML = `<img src="${currentGame.currentPlayer.token}">`;
};

function disableBoardSqaures() {
  for (var i = 0; i < boardSquares.length; i++) {
    boardSquares[i].disabled = true;
  };
};;

function updateWinHeader() {
  if (currentGame.isDraw) {
    turnHeader.innerHTML = "It's a Draw!";
  } else {
    turnHeader.innerHTML = `${currentGame.currentPlayer.name} wins!`;
};
}

function updateTurnHeader() {
  turnHeader.innerHTML = `It's ${currentGame.currentPlayer.name}'s Turn!`;
}

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
    boardSquares[i].innerHTML = "";
  };
};

function updateWinCounter() {
    winCounts[0].innerHTML = currentGame.xPlayer.wins;
    winCounts[1].innerHTML = currentGame.oPlayer.wins;
};

function hide(element){
  element.classList.add('hidden');
};

function show(element){
  element.classList.remove('hidden');
};