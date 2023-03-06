// GLOBAL DATA MODEL //
var currentGame = {};
var firstPlayer = null;
var secondPlayer = null;
var numOfPlayers = 0;

// QUERY SELECTORS //
var gameBoard = document.querySelector('.js-game-board');
var boardSquares = document.querySelectorAll('.js-board-square');
var playerBoxes = document.querySelectorAll('.js-player-box')
var winBoxHeaders = document.querySelectorAll('.js-win-box');
var turnHeader = document.querySelector('.js-turn-header');
var winCounts = document.querySelectorAll('.js-win-count');
var nameInput = document.querySelector('.js-name-input');
var userInputForm = document.querySelector('.js-user-input-form');
var playerNameTitles = document.querySelectorAll('.js-player-name');
var newGameBtn = document.querySelector('.js-new-game-button');
var playBtn = document.querySelector('.js-play-btn');
var body = document.querySelector('.body');
var numPlayersBtnBox = document.querySelector('.js-num-players-btn-box');
var onePlayerBtn = document.querySelector('.js-one-player-btn');
var twoPlayerBtn = document.querySelector('.js-one-player-btn');
var userPrompt = document.querySelector('.js-user-prompt')

// var clearBtn = document.querySelector('.js-clear-btn')
// clearBtn.addEventListener('click', function(){
//   localStorage.clear()
// })

// EVENT LISTENERS // 

numPlayersBtnBox.addEventListener('click', function() {
  event.preventDefault();
  numOfPlayers = event.target.id
  pageNagivation();
});

nameInput.addEventListener('input', function(){
  updateNameFormDOM();
  }
);

playBtn.addEventListener('click', function(event) {
  event.preventDefault();
    if (!nameInput.value) {
      makeGenericPlayer();
    } else {
      var userInput = nameInput.value.toLowerCase();
      checkStorageForPlayer(userInput);
    };
    clearInput();
    pageNagivation();
  }
);

gameBoard.addEventListener('click', function() {
  if (event.target.id) {
    updateDM();
    updateDOM();
    };
  }
);

newGameBtn.addEventListener('click', function() {
  updateDMforNewGame();
  updateDOMforNewGame();
  }
);

// DOM MANIPULATION - BUNDLE FUNCTIONS //

function pageNagivation() {
  if (!firstPlayer) {
    navigateToFirstNameForm()
  } else if (!secondPlayer && numOfPlayers === "2") {
      console.log("80")
      navigateToSecondNameForm()
  } else if (!secondPlayer && numOfPlayers === "1") {
      console.log("83")
      currentGame = new OnePlayerGame(firstPlayer)
      currentGame.establishXandOPlayers()
      updateDOMforFirstGame()
  } else if (firstPlayer && secondPlayer) {
    updateDMforFirstGame();
    updateDOMforFirstGame();
  };
};

function navigateToFirstNameForm() {
  userPrompt.innerText = "What's Your Name?"
  userInputForm.classList = "name-form js-user-input-form"
  show(nameInput)
  show(playBtn)
  hide(numPlayersBtnBox)
  body.background = "./assets/wheat.jpg"
}

function navigateToSecondNameForm() {
  userInputForm.classList = "second-name-form js-user-input-form";
  playBtn.classList = "second-play-btn js-play-btn";
  body.background = "./assets/flowers.jpg";
}

function updateDOMforFirstGame() {
  hide(userInputForm);
  // show(clearBtn)
  show(gameBoard);
  show(newGameBtn);
  show(playerBoxes[0]);
  show(playerBoxes[1]);
  playerNameTitles[0].innerText = currentGame.firstPlayer.name;
  playerNameTitles[1].innerText = currentGame.secondPlayer.name;
  body.background = "./assets/sun.jpg";
  updateTurnHeader();
};

function updateDMforFirstGame() {
  currentGame = new Game(firstPlayer, secondPlayer);
  currentGame.establishXandOPlayers();
};

function updateDM() {
  currentGame.addChoice(event.target.id);
  currentGame.updateAvailableSquaresArray(event.target.id);
  currentGame.checkWinOrDraw();
};

function updateDOM() {
  updateTargetSquare();
  if (currentGame.isOver) {
    disableBoardSqaures();
    updateWinHeader();
    setTimeout(setUpNewGame, 4000);
  } else {
    currentGame.passTurn();
    updateTurnHeader();
  };
};

function setUpNewGame() {
  updateDMforNewGame();
  updateDOMforNewGame();
};

function updateDMforNewGame() {
  currentGame.updatePlayersInStorage();
  currentGame.initiateNewGame();
  currentGame.checkXandOPlayers();
};

function updateDOMforNewGame() {
  activateSquares();
  resetDOM();
  updateTurnHeader();
  updateWinCounter();
};

// DOM MANIPULATION - ATOMIC FUNCTIONS //

function updateNameFormDOM(){
  if (nameInput.value) {
    playBtn.innerText = "Let's Play!";
  } else {
    playBtn.innerText = "Continue as Guest";
  };
};

function checkStorageForPlayer(userInput) {
  var newPlayer = {};
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key([i]) === `${userInput}`) {
      newPlayer = JSON.parse(localStorage.getItem(`${userInput}`));
      setFirstOrSecond(newPlayer);
      return true;
    };
  };
  makeNewPlayer(userInput);
};

function makeGenericPlayer() {
  if (!firstPlayer) {
    firstPlayer = new Player("Player 1");
  } else {
    secondPlayer = new Player("Player 2");
  };
};

function makeNewPlayer(userInput) {
  newPlayer = new Player(`${userInput}`);
  localStorage.setItem(`${userInput}`, JSON.stringify(newPlayer));
  setFirstOrSecond(newPlayer);
};

function setFirstOrSecond(newPlayer) {
  if (newPlayer && !firstPlayer) {
    firstPlayer = newPlayer;
  } else if (newPlayer) {
    secondPlayer = newPlayer;
  } 
};

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
};
  
function updateWinHeader() {
  if (currentGame.isDraw) {
    turnHeader.innerHTML = "It's a Draw!";
  } else {
    turnHeader.innerHTML = `${currentGame.currentPlayer.name} wins!`;
  };
};
  
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



